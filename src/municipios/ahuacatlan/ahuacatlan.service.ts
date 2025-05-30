import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAhuacatlanDto } from './dto/update-ahuacatlan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AhuacatlanBeneficiario } from './entities/ahuacatlan-beneficiario.entity';
import { AhuacatlanBeneficio } from './entities/ahuacatlan-beneficio.entity';
import { AhuacatlanDomicilioBeneficiario } from './entities/ahuacatlan-domicilio.entity';
import { CreateAhuacatlanBeneficiarioDto } from './dto/create-ahuacatlan-beneficiario.dto';
import { CreateAhuacatlanBeneficioDto } from './dto/create-ahuacatlan-beneficio.dto';
import { CreateAhuacatlanDomicilioDto } from './dto/create-ahuacatlan-domicilio.dto';

@Injectable()
export class AhuacatlanService {
  constructor(
    @InjectRepository(AhuacatlanBeneficiario)
    private beneficiarioRepository: Repository<AhuacatlanBeneficiario>,
    @InjectRepository(AhuacatlanBeneficio)
    private beneficioRepository: Repository<AhuacatlanBeneficio>,
    @InjectRepository(AhuacatlanDomicilioBeneficiario)
    private domicilioRepository: Repository<AhuacatlanDomicilioBeneficiario>,
  ) { }

  async createWithRelation(
    createAhuacatlanBeneficiarioDto: CreateAhuacatlanBeneficiarioDto,
    createAhuacatlanBeneficioDto: CreateAhuacatlanBeneficioDto,
    createAhuacatlanDomicilioDto: CreateAhuacatlanDomicilioDto,
  ): Promise<any> {
    const beneficiario = new AhuacatlanBeneficiario();
    Object.assign(beneficiario, createAhuacatlanBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new AhuacatlanBeneficio();
    Object.assign(beneficio, createAhuacatlanBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new AhuacatlanDomicilioBeneficiario();
    Object.assign(domicilio, createAhuacatlanDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateAhuacatlanBeneficiarioDto[],
    beneficiosDto: CreateAhuacatlanBeneficioDto[],
    domiciliosDto: CreateAhuacatlanDomicilioDto[],
  ): Promise<any[]> {
    const resultados = [];

    for (let i = 0; i < beneficiariosDto.length; i++) {
      const beneficiarioDto = beneficiariosDto[i];
      const beneficioDto = beneficiosDto[i];
      const domicilioDto = domiciliosDto[i];

      const beneficiario = new AhuacatlanBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new AhuacatlanBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new AhuacatlanDomicilioBeneficiario();
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

  //   async update(
  //   id: number,
  //   updateDto: UpdateAhuacatlanCompletoDto
  // ): Promise<{ message: string }> {
  //   // Actualizar beneficiario
  //   const beneficiario = await this.beneficiarioRepository.findOne({
  //     where: { id_beneficiario_Ahuacatlan: id },
  //     relations: ['beneficios', 'domicilios'],
  //   });
  //   if (!beneficiario) {
  //     throw new NotFoundException(`No se encontró el beneficiario con ID ${id}`);
  //   }
  //   Object.assign(beneficiario, updateDto.beneficiario);
  //   await this.beneficiarioRepository.save(beneficiario);

  //   // Actualizar beneficio (asumiendo solo uno, ajusta si hay varios)
  //   if (beneficiario.beneficios?.length) {
  //     const beneficio = beneficiario.beneficios[0];
  //     Object.assign(beneficio, updateDto.beneficio);
  //     await this.beneficioRepository.save(beneficio);
  //   }

  //   // Actualizar domicilio (asumiendo solo uno, ajusta si hay varios)
  //   if (beneficiario.domicilios?.length) {
  //     const domicilio = beneficiario.domicilios[0];
  //     Object.assign(domicilio, updateDto.domicilio);
  //     await this.domicilioRepository.save(domicilio);
  //   }

  //   return { message: `El beneficiario con ID ${id} y sus relaciones fueron actualizados correctamente` };
  // }

  async remove(id: number): Promise<{ message: string }> {
    const beneficiario = await this.beneficiarioRepository.findOne({
      where: { id_beneficiario_ahuacatlan: id },
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
