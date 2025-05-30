import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AmatlanBeneficiario } from './entities/amatlan-beneficiario.entity';
import { AmatlanBeneficio } from './entities/amatlan-beneficio.entity';
import { AmatlanDomicilioBeneficiario } from './entities/amatlan-domicilio.entity';
import { CreateAmatlanBeneficiarioDto } from './dto/create-amatlan-beneficiario.dto';
import { CreateAmatlanBeneficioDto } from './dto/create-amatlan-beneficio.dto';
import { CreateAmatlanDomicilioDto } from './dto/create-amatlan-domicilio.dto';
import { UpdateAmatlanCompletoDto } from './dto/update-amatlan-completo.dto';

@Injectable()
export class AmatlanService {
  constructor(
    @InjectRepository(AmatlanBeneficiario)
    private beneficiarioRepository: Repository<AmatlanBeneficiario>,
    @InjectRepository(AmatlanBeneficio)
    private beneficioRepository: Repository<AmatlanBeneficio>,
    @InjectRepository(AmatlanDomicilioBeneficiario)
    private domicilioRepository: Repository<AmatlanDomicilioBeneficiario>,
  ) { }

  async createWithRelation(
    createAmatlanBeneficiarioDto: CreateAmatlanBeneficiarioDto,
    createAmatlanBeneficioDto: CreateAmatlanBeneficioDto,
    createAmatlanDomicilioDto: CreateAmatlanDomicilioDto,
  ): Promise<any> {
    const beneficiario = new AmatlanBeneficiario();
    Object.assign(beneficiario, createAmatlanBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new AmatlanBeneficio();
    Object.assign(beneficio, createAmatlanBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new AmatlanDomicilioBeneficiario();
    Object.assign(domicilio, createAmatlanDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateAmatlanBeneficiarioDto[],
    beneficiosDto: CreateAmatlanBeneficioDto[],
    domiciliosDto: CreateAmatlanDomicilioDto[],
  ): Promise<any[]> {
    const resultados = [];

    for (let i = 0; i < beneficiariosDto.length; i++) {
      const beneficiarioDto = beneficiariosDto[i];
      const beneficioDto = beneficiosDto[i];
      const domicilioDto = domiciliosDto[i];

      const beneficiario = new AmatlanBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new AmatlanBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new AmatlanDomicilioBeneficiario();
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
    updateDto: UpdateAmatlanCompletoDto
  ): Promise<{ message: string }> {
    // Actualizar beneficiario
    const beneficiario = await this.beneficiarioRepository.findOne({
      where: { id_beneficiario_amatlan: id },
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
      where: { id_beneficiario_amatlan: id },
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
