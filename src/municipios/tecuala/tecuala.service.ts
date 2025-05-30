import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TecualaBeneficiario } from './entities/tecuala-beneficiario.entity';
import { TecualaBeneficio } from './entities/tecuala-beneficio.entity';
import { TecualaDomicilioBeneficiario } from './entities/tecuala-domicilio.entity';
import { CreateTecualaBeneficiarioDto } from './dto/create-tecuala-beneficiario.dto';
import { CreateTecualaBeneficioDto } from './dto/create-tecuala-beneficio.dto';
import { CreateTecualaDomicilioDto } from './dto/create-tecuala-domicilio.dto';
import { UpdateTecualaCompletoDto } from './dto/update-tecuala-completo.dto';

@Injectable()
export class TecualaService {
  constructor(
    @InjectRepository(TecualaBeneficiario)
    private beneficiarioRepository: Repository<TecualaBeneficiario>,
    @InjectRepository(TecualaBeneficio)
    private beneficioRepository: Repository<TecualaBeneficio>,
    @InjectRepository(TecualaDomicilioBeneficiario)
    private domicilioRepository: Repository<TecualaDomicilioBeneficiario>,
  ) { }

  async createWithRelation(
    createTecualaBeneficiarioDto: CreateTecualaBeneficiarioDto,
    createTecualaBeneficioDto: CreateTecualaBeneficioDto,
    createTecualaDomicilioDto: CreateTecualaDomicilioDto,
  ): Promise<any> {
    const beneficiario = new TecualaBeneficiario();
    Object.assign(beneficiario, createTecualaBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new TecualaBeneficio();
    Object.assign(beneficio, createTecualaBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new TecualaDomicilioBeneficiario();
    Object.assign(domicilio, createTecualaDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateTecualaBeneficiarioDto[],
    beneficiosDto: CreateTecualaBeneficioDto[],
    domiciliosDto: CreateTecualaDomicilioDto[],
  ): Promise<any[]> {
    const resultados = [];

    for (let i = 0; i < beneficiariosDto.length; i++) {
      const beneficiarioDto = beneficiariosDto[i];
      const beneficioDto = beneficiosDto[i];
      const domicilioDto = domiciliosDto[i];

      const beneficiario = new TecualaBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new TecualaBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new TecualaDomicilioBeneficiario();
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
    updateDto: UpdateTecualaCompletoDto
  ): Promise<{ message: string }> {
    // Actualizar beneficiario
    const beneficiario = await this.beneficiarioRepository.findOne({
      where: { id_beneficiario_tecuala: id },
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
      where: { id_beneficiario_tecuala: id },
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
