import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HuajicoriBeneficiario } from './entities/huajicori-beneficiario.entity';
import { HuajicoriBeneficio } from './entities/huajicori-beneficio.entity';
import { HuajicoriDomicilioBeneficiario } from './entities/huajicori-domicilio.entity';
import { CreateHuajicoriBeneficiarioDto } from './dto/create-huajicori-beneficiario.dto';
import { CreateHuajicoriBeneficioDto } from './dto/create-huajicori-beneficio.dto';
import { CreateHuajicoriDomicilioDto } from './dto/create-huajicori-domicilio.dto';
import { UpdateHuajicoriCompletoDto } from './dto/update-huajicori-completo.dto';

@Injectable()
export class HuajicoriService {
  constructor(
    @InjectRepository(HuajicoriBeneficiario)
    private beneficiarioRepository: Repository<HuajicoriBeneficiario>,
    @InjectRepository(HuajicoriBeneficio)
    private beneficioRepository: Repository<HuajicoriBeneficio>,
    @InjectRepository(HuajicoriDomicilioBeneficiario)
    private domicilioRepository: Repository<HuajicoriDomicilioBeneficiario>,
  ) { }

  async createWithRelation(
    createHuajicoriBeneficiarioDto: CreateHuajicoriBeneficiarioDto,
    createHuajicoriBeneficioDto: CreateHuajicoriBeneficioDto,
    createHuajicoriDomicilioDto: CreateHuajicoriDomicilioDto,
  ): Promise<any> {
    const beneficiario = new HuajicoriBeneficiario();
    Object.assign(beneficiario, createHuajicoriBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new HuajicoriBeneficio();
    Object.assign(beneficio, createHuajicoriBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new HuajicoriDomicilioBeneficiario();
    Object.assign(domicilio, createHuajicoriDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateHuajicoriBeneficiarioDto[],
    beneficiosDto: CreateHuajicoriBeneficioDto[],
    domiciliosDto: CreateHuajicoriDomicilioDto[],
  ): Promise<any[]> {
    const resultados = [];

    for (let i = 0; i < beneficiariosDto.length; i++) {
      const beneficiarioDto = beneficiariosDto[i];
      const beneficioDto = beneficiosDto[i];
      const domicilioDto = domiciliosDto[i];

      const beneficiario = new HuajicoriBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new HuajicoriBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new HuajicoriDomicilioBeneficiario();
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
    updateDto: UpdateHuajicoriCompletoDto
  ): Promise<{ message: string }> {
    // Actualizar beneficiario
    const beneficiario = await this.beneficiarioRepository.findOne({
      where: { id_beneficiario_huajicori: id },
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
      where: { id_beneficiario_huajicori: id },
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
