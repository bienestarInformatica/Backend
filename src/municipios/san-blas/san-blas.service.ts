import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SanBlasBeneficiario } from './entities/san-blas-beneficiario.entity';
import { SanBlasBeneficio } from './entities/san-blas-beneficio.entity';
import { SanBlasDomicilioBeneficiario } from './entities/san-blas.domicilio.entity';
import { CreateSanBlasBeneficiarioDto } from './dto/create-san-blas-beneficiario.dto';
import { CreateSanBlasBeneficioDto } from './dto/create-san-blas-beneficio.dto';
import { CreateSanBlasDomicilioDto } from './dto/create-san-blas-domicilio.dto';
import { UpdateSanBlasCompletoDto } from './dto/update-san-blas-completo.dto';

@Injectable()
export class SanBlasService {
  constructor(
    @InjectRepository(SanBlasBeneficiario)
    private beneficiarioRepository: Repository<SanBlasBeneficiario>,
    @InjectRepository(SanBlasBeneficio)
    private beneficioRepository: Repository<SanBlasBeneficio>,
    @InjectRepository(SanBlasDomicilioBeneficiario)
    private domicilioRepository: Repository<SanBlasDomicilioBeneficiario>,
  ) { }

  async createWithRelation(
    createSanBlasBeneficiarioDto: CreateSanBlasBeneficiarioDto,
    createSanBlasBeneficioDto: CreateSanBlasBeneficioDto,
    createSanBlasDomicilioDto: CreateSanBlasDomicilioDto,
  ): Promise<any> {
    const beneficiario = new SanBlasBeneficiario();
    Object.assign(beneficiario, createSanBlasBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new SanBlasBeneficio();
    Object.assign(beneficio, createSanBlasBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new SanBlasDomicilioBeneficiario();
    Object.assign(domicilio, createSanBlasDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateSanBlasBeneficiarioDto[],
    beneficiosDto: CreateSanBlasBeneficioDto[],
    domiciliosDto: CreateSanBlasDomicilioDto[],
  ): Promise<any[]> {
    const resultados = [];

    for (let i = 0; i < beneficiariosDto.length; i++) {
      const beneficiarioDto = beneficiariosDto[i];
      const beneficioDto = beneficiosDto[i];
      const domicilioDto = domiciliosDto[i];

      const beneficiario = new SanBlasBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new SanBlasBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new SanBlasDomicilioBeneficiario();
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
    updateDto: UpdateSanBlasCompletoDto
  ): Promise<{ message: string }> {
    // Actualizar beneficiario
    const beneficiario = await this.beneficiarioRepository.findOne({
      where: { id_beneficiario_sanblas: id },
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
      where: { id_beneficiario_sanblas: id },
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
