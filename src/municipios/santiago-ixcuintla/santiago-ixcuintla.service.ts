import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SantiagoIxcuintlaBeneficiario } from './entities/santiago-ixcuintla-beneficiario.entity';
import { SantiagoIxcuintlaBeneficio } from './entities/santiago-ixcuintla-beneficio.entity';
import { SantiagoIxcuintlaDomicilioBeneficiario } from './entities/santiago-ixcuintla-domicilio.entity';
import { CreateSantiagoIxcuintlaBeneficiarioDto } from './dto/create-santiago-ixcuintla-beneficiario.dto';
import { CreateSantiagoIxcuintlaBeneficioDto } from './dto/create-santiago-ixcuintla-beneficio.dto';
import { CreateSantiagoIxcuintlaDomicilioDto } from './dto/create-santiago-ixcuintla-domicilio.dto';
import { UpdateSantiagoIxcuintlaCompletoDto } from './dto/update-santiago-ixcuintla-completo.dto';

@Injectable()
export class SantiagoIxcuintlaService {
  constructor(
    @InjectRepository(SantiagoIxcuintlaBeneficiario)
    private beneficiarioRepository: Repository<SantiagoIxcuintlaBeneficiario>,
    @InjectRepository(SantiagoIxcuintlaBeneficio)
    private beneficioRepository: Repository<SantiagoIxcuintlaBeneficio>,
    @InjectRepository(SantiagoIxcuintlaDomicilioBeneficiario)
    private domicilioRepository: Repository<SantiagoIxcuintlaDomicilioBeneficiario>,
  ) { }

  async createWithRelation(
    createSantiagoIxcuintlaBeneficiarioDto: CreateSantiagoIxcuintlaBeneficiarioDto,
    createSantiagoIxcuintlaBeneficioDto: CreateSantiagoIxcuintlaBeneficioDto,
    createSantiagoIxcuintlaDomicilioDto: CreateSantiagoIxcuintlaDomicilioDto,
  ): Promise<any> {
    const beneficiario = new SantiagoIxcuintlaBeneficiario();
    Object.assign(beneficiario, createSantiagoIxcuintlaBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new SantiagoIxcuintlaBeneficio();
    Object.assign(beneficio, createSantiagoIxcuintlaBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new SantiagoIxcuintlaDomicilioBeneficiario();
    Object.assign(domicilio, createSantiagoIxcuintlaDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateSantiagoIxcuintlaBeneficiarioDto[],
    beneficiosDto: CreateSantiagoIxcuintlaBeneficioDto[],
    domiciliosDto: CreateSantiagoIxcuintlaDomicilioDto[],
  ): Promise<any[]> {
    const resultados = [];

    for (let i = 0; i < beneficiariosDto.length; i++) {
      const beneficiarioDto = beneficiariosDto[i];
      const beneficioDto = beneficiosDto[i];
      const domicilioDto = domiciliosDto[i];

      const beneficiario = new SantiagoIxcuintlaBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new SantiagoIxcuintlaBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new SantiagoIxcuintlaDomicilioBeneficiario();
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
    updateDto: UpdateSantiagoIxcuintlaCompletoDto
  ): Promise<{ message: string }> {
    // Actualizar beneficiario
    const beneficiario = await this.beneficiarioRepository.findOne({
      where: { id_beneficiario_santiago: id },
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
      where: { id_beneficiario_santiago: id },
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
