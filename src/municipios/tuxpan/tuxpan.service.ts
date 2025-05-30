import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TuxpanBeneficiario } from './entities/tuxpan-beneficiario.entity';
import { TuxpanBeneficio } from './entities/tuxpan-beneficio.entity';
import { TuxpanDomicilioBeneficiario } from './entities/tuxpan-domicilio.entity';
import { CreateTuxpanBeneficiarioDto } from './dto/create-tuxpan-beneficiario.dto';
import { CreateTuxpanBeneficioDto } from './dto/create-tuxpan-beneficio.dto';
import { CreateTuxpanDomicilioDto } from './dto/create-tuxpan-domicilio.dto';
import { UpdateTuxpanCompletoDto } from './dto/update-tuxpan-completo.dto';

@Injectable()
export class TuxpanService {
  constructor(
    @InjectRepository(TuxpanBeneficiario)
    private beneficiarioRepository: Repository<TuxpanBeneficiario>,
    @InjectRepository(TuxpanBeneficio)
    private beneficioRepository: Repository<TuxpanBeneficio>,
    @InjectRepository(TuxpanDomicilioBeneficiario)
    private domicilioRepository: Repository<TuxpanDomicilioBeneficiario>,
  ) { }

  async createWithRelation(
    createTuxpanBeneficiarioDto: CreateTuxpanBeneficiarioDto,
    createTuxpanBeneficioDto: CreateTuxpanBeneficioDto,
    createTuxpanDomicilioDto: CreateTuxpanDomicilioDto,
  ): Promise<any> {
    const beneficiario = new TuxpanBeneficiario();
    Object.assign(beneficiario, createTuxpanBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new TuxpanBeneficio();
    Object.assign(beneficio, createTuxpanBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new TuxpanDomicilioBeneficiario();
    Object.assign(domicilio, createTuxpanDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateTuxpanBeneficiarioDto[],
    beneficiosDto: CreateTuxpanBeneficioDto[],
    domiciliosDto: CreateTuxpanDomicilioDto[],
  ): Promise<any[]> {
    const resultados = [];

    for (let i = 0; i < beneficiariosDto.length; i++) {
      const beneficiarioDto = beneficiariosDto[i];
      const beneficioDto = beneficiosDto[i];
      const domicilioDto = domiciliosDto[i];

      const beneficiario = new TuxpanBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new TuxpanBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new TuxpanDomicilioBeneficiario();
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
    updateDto: UpdateTuxpanCompletoDto
  ): Promise<{ message: string }> {
    // Actualizar beneficiario
    const beneficiario = await this.beneficiarioRepository.findOne({
      where: { id_beneficiario_tuxpan: id },
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
      where: { id_beneficiario_tuxpan: id },
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
