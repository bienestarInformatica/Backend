import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SanPedroLagunillasBeneficiario } from './entities/san-pedro-lagunillas-beneficiario.entity';
import { SanPedroLagunillasBeneficio } from './entities/san-pedro-lagunillas-beneficio.entity';
import { SanPedroLagunillasDomicilioBeneficiario } from './entities/san-pedro-lagunillas-domicilio.entity';
import { CreateSanPedroLagunillasBeneficiarioDto } from './dto/create-san-pedro-lagunillas-beneficiario.dto';
import { CreateSanPedroLagunillasBeneficioDto } from './dto/create-san-pedro-lagunillas-beneficio.dto';
import { CreateSanPedroLagunillasDomicilioDto } from './dto/create-san-pedro-lagunillas-domicilio.dto';
import { UpdateSanPedroLagunillasCompletoDto } from './dto/update-san-pedro-lagunillas-completo.dto';

@Injectable()
export class SanPedroLagunillasService {
  constructor(
    @InjectRepository(SanPedroLagunillasBeneficiario)
    private beneficiarioRepository: Repository<SanPedroLagunillasBeneficiario>,
    @InjectRepository(SanPedroLagunillasBeneficio)
    private beneficioRepository: Repository<SanPedroLagunillasBeneficio>,
    @InjectRepository(SanPedroLagunillasDomicilioBeneficiario)
    private domicilioRepository: Repository<SanPedroLagunillasDomicilioBeneficiario>,
  ) { }

  async createWithRelation(
    createSanPedroLagunillasBeneficiarioDto: CreateSanPedroLagunillasBeneficiarioDto,
    createSanPedroLagunillasBeneficioDto: CreateSanPedroLagunillasBeneficioDto,
    createSanPedroLagunillasDomicilioDto: CreateSanPedroLagunillasDomicilioDto,
  ): Promise<any> {
    const beneficiario = new SanPedroLagunillasBeneficiario();
    Object.assign(beneficiario, createSanPedroLagunillasBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new SanPedroLagunillasBeneficio();
    Object.assign(beneficio, createSanPedroLagunillasBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new SanPedroLagunillasDomicilioBeneficiario();
    Object.assign(domicilio, createSanPedroLagunillasDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateSanPedroLagunillasBeneficiarioDto[],
    beneficiosDto: CreateSanPedroLagunillasBeneficioDto[],
    domiciliosDto: CreateSanPedroLagunillasDomicilioDto[],
  ): Promise<any[]> {
    const resultados = [];

    for (let i = 0; i < beneficiariosDto.length; i++) {
      const beneficiarioDto = beneficiariosDto[i];
      const beneficioDto = beneficiosDto[i];
      const domicilioDto = domiciliosDto[i];

      const beneficiario = new SanPedroLagunillasBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new SanPedroLagunillasBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new SanPedroLagunillasDomicilioBeneficiario();
      Object.assign(domicilio, domicilioDto);
      domicilio.beneficiario = savedBeneficiario;
      const savedDomicilio = await this.domicilioRepository.save(domicilio);

      resultados.push({
        beneficiario: savedBeneficiario,
        beneficio: savedBeneficio,
        domicilio: savedDomicilio,
      });
    }
    return resultados;
  }

  async findAllWithRelations(): Promise<any> {
    const beneficiarios = await this.beneficiarioRepository.find({
      relations: ['beneficios', 'domicilios'],
    });

    return beneficiarios;
  }

  async update(
    id: number,
    updateDto: UpdateSanPedroLagunillasCompletoDto
  ): Promise<{ message: string }> {
    // Actualizar beneficiario
    const beneficiario = await this.beneficiarioRepository.findOne({
      where: { id_beneficiario_sanpedro: id },
      relations: ['beneficios', 'domicilios'],
    });
    if (!beneficiario) {
      throw new NotFoundException(`No se encontró el beneficiario con ID ${id}`);
    }
    Object.assign(beneficiario, updateDto.beneficiario);
    await this.beneficiarioRepository.save(beneficiario);

    // Actualizar beneficio (asumiendo solo uno, ajusta si hay varios)
    if (beneficiario.beneficios?.length) {
      const beneficio = beneficiario.beneficios[0];
      Object.assign(beneficio, updateDto.beneficio);
      await this.beneficioRepository.save(beneficio);
    }

    // Actualizar domicilio (asumiendo solo uno, ajusta si hay varios)
    if (beneficiario.domicilios?.length) {
      const domicilio = beneficiario.domicilios[0];
      Object.assign(domicilio, updateDto.domicilio);
      await this.domicilioRepository.save(domicilio);
    }

    return { message: `El beneficiario con ID ${id} y sus relaciones fueron actualizados correctamente` };
  }

  async remove(id: number): Promise<{ message: string }> {
    const beneficiario = await this.beneficiarioRepository.findOne({
      where: { id_beneficiario_sanpedro: id },
      relations: ['beneficios', 'domicilios'],
    });
    if (!beneficiario) {
      throw new NotFoundException(`No se encontró el beneficiario con ID ${id}`);
    }
    if (beneficiario.beneficios?.length) {
      await this.beneficioRepository.remove(beneficiario.beneficios);
    }
    if (beneficiario.domicilios?.length) {
      await this.domicilioRepository.remove(beneficiario.domicilios);
    }
    await this.beneficiarioRepository.remove(beneficiario);
    return { message: `El beneficiario con ID ${id} fue eliminado correctamente` };
  }
}
