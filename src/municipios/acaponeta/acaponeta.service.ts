import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAcaponetaDto } from './dto/update-acaponeta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AcaponetaBeneficiario } from './entities/acaponeta-beneficiario.entity';
import { AcaponetaBeneficio } from './entities/acaponeta-beneficio.entity';
import { AcaponetaDomicilioBeneficiario } from './entities/acaponeta-domicilio.entity';
import { Repository } from 'typeorm';
import { CreateAcaponetaBeneficiarioDto } from './dto/create-acaponeta-beneficiario.dto';
import { CreateAcaponetaBeneficioDto } from './dto/create-acaponeta-beneficio.dto';
import { CreateAcaponetaDomicilioDto } from './dto/create-acaponeta-domicilio.dto';
import { UpdateAcaponetaCompletoDto } from './dto/update-acaponeta-completo.dto';

@Injectable()
export class AcaponetaService {
  constructor(
    @InjectRepository(AcaponetaBeneficiario)
    private beneficiarioRepository: Repository<AcaponetaBeneficiario>,
    @InjectRepository(AcaponetaBeneficio)
    private beneficioRepository: Repository<AcaponetaBeneficio>,
    @InjectRepository(AcaponetaDomicilioBeneficiario)
    private domicilioRepository: Repository<AcaponetaDomicilioBeneficiario>,
  ) { }

  async createWithRelation(
    createAcaponetaBeneficiarioDto: CreateAcaponetaBeneficiarioDto,
    createAcaponetaBeneficioDto: CreateAcaponetaBeneficioDto,
    createAcaponetaDomicilioDto: CreateAcaponetaDomicilioDto,
  ): Promise<any> {
    const beneficiario = new AcaponetaBeneficiario();
    Object.assign(beneficiario, createAcaponetaBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new AcaponetaBeneficio();
    Object.assign(beneficio, createAcaponetaBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new AcaponetaDomicilioBeneficiario();
    Object.assign(domicilio, createAcaponetaDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateAcaponetaBeneficiarioDto[],
    beneficiosDto: CreateAcaponetaBeneficioDto[],
    domiciliosDto: CreateAcaponetaDomicilioDto[],
  ): Promise<any[]> {
    const resultados = [];

    for (let i = 0; i < beneficiariosDto.length; i++) {
      const beneficiarioDto = beneficiariosDto[i];
      const beneficioDto = beneficiosDto[i];
      const domicilioDto = domiciliosDto[i];

      const beneficiario = new AcaponetaBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new AcaponetaBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new AcaponetaDomicilioBeneficiario();
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
    updateDto: UpdateAcaponetaCompletoDto
  ): Promise<{ message: string }> {
    // Actualizar beneficiario
    const beneficiario = await this.beneficiarioRepository.findOne({
      where: { id_beneficiario_acaponeta: id },
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
      where: { id_beneficiario_acaponeta: id },
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
