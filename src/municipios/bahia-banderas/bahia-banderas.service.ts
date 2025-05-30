import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BahiaBeneficiario } from './entities/bahia-banderas-beneficiario.entity';
import { BahiaBeneficio } from './entities/bahia-banderas-beneficio.entity';
import { BahiaDomicilioBeneficiario } from './entities/bahia-banderas-domicilio.entity';
import { CreateBahiaBeneficiarioDto } from './dto/create-bahia-banderas-beneficiario.dto';
import { CreateBahiaBeneficioDto } from './dto/create-bahia-banderas-beneficio.dto';
import { CreateBahiaDomicilioDto } from './dto/create-bahia-banderas-domicilio.dto';
import { UpdateBahiaCompletoDto } from './dto/update-bahia-banderas-completo.dto';

@Injectable()
export class BahiaBanderasService {
  constructor(
    @InjectRepository(BahiaBeneficiario)
    private beneficiarioRepository: Repository<BahiaBeneficiario>,
    @InjectRepository(BahiaBeneficio)
    private beneficioRepository: Repository<BahiaBeneficio>,
    @InjectRepository(BahiaDomicilioBeneficiario)
    private domicilioRepository: Repository<BahiaDomicilioBeneficiario>,
  ) { }

  async createWithRelation(
    createBahiaBeneficiarioDto: CreateBahiaBeneficiarioDto,
    createBahiaBeneficioDto: CreateBahiaBeneficioDto,
    createBahiaDomicilioDto: CreateBahiaDomicilioDto,
  ): Promise<any> {
    const beneficiario = new BahiaBeneficiario();
    Object.assign(beneficiario, createBahiaBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new BahiaBeneficio();
    Object.assign(beneficio, createBahiaBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new BahiaDomicilioBeneficiario();
    Object.assign(domicilio, createBahiaDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateBahiaBeneficiarioDto[],
    beneficiosDto: CreateBahiaBeneficioDto[],
    domiciliosDto: CreateBahiaDomicilioDto[],
  ): Promise<any[]> {
    const resultados = [];

    for (let i = 0; i < beneficiariosDto.length; i++) {
      const beneficiarioDto = beneficiariosDto[i];
      const beneficioDto = beneficiosDto[i];
      const domicilioDto = domiciliosDto[i];

      const beneficiario = new BahiaBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new BahiaBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new BahiaDomicilioBeneficiario();
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
    updateDto: UpdateBahiaCompletoDto
  ): Promise<{ message: string }> {
    // Actualizar beneficiario
    const beneficiario = await this.beneficiarioRepository.findOne({
      where: { id_beneficiario_bahia: id },
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
      where: { id_beneficiario_bahia: id },
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
