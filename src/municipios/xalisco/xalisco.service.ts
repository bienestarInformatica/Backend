import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { XaliscoBeneficiario } from './entities/xalisco-beneficiario.entity';
import { XaliscoBeneficio } from './entities/xalisco-beneficio.entity';
import { XaliscoDomicilioBeneficiario } from './entities/xalisco-domicilio.entity';
import { CreateXaliscoBeneficiarioDto } from './dto/create-xalisco-beneficiario.dto';
import { CreateXaliscoBeneficioDto } from './dto/create-xalisco-beneficio.dto';
import { CreateXaliscoDomicilioDto } from './dto/create-xalisco-domicilio.dto';
import { UpdateXaliscoCompletoDto } from './dto/update-xalisco-completo.dto';

@Injectable()
export class XaliscoService {
  constructor(
    @InjectRepository(XaliscoBeneficiario)
    private beneficiarioRepository: Repository<XaliscoBeneficiario>,
    @InjectRepository(XaliscoBeneficio)
    private beneficioRepository: Repository<XaliscoBeneficio>,
    @InjectRepository(XaliscoDomicilioBeneficiario)
    private domicilioRepository: Repository<XaliscoDomicilioBeneficiario>,
  ) { }

  async createWithRelation(
    createXaliscoBeneficiarioDto: CreateXaliscoBeneficiarioDto,
    createXaliscoBeneficioDto: CreateXaliscoBeneficioDto,
    createXaliscoDomicilioDto: CreateXaliscoDomicilioDto,
  ): Promise<any> {
    const beneficiario = new XaliscoBeneficiario();
    Object.assign(beneficiario, createXaliscoBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new XaliscoBeneficio();
    Object.assign(beneficio, createXaliscoBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new XaliscoDomicilioBeneficiario();
    Object.assign(domicilio, createXaliscoDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateXaliscoBeneficiarioDto[],
    beneficiosDto: CreateXaliscoBeneficioDto[],
    domiciliosDto: CreateXaliscoDomicilioDto[],
  ): Promise<any[]> {
    const resultados = [];

    for (let i = 0; i < beneficiariosDto.length; i++) {
      const beneficiarioDto = beneficiariosDto[i];
      const beneficioDto = beneficiosDto[i];
      const domicilioDto = domiciliosDto[i];

      const beneficiario = new XaliscoBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new XaliscoBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new XaliscoDomicilioBeneficiario();
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
    updateDto: UpdateXaliscoCompletoDto
  ): Promise<{ message: string }> {
    // Actualizar beneficiario
    const beneficiario = await this.beneficiarioRepository.findOne({
      where: { id_beneficiario_xalisco: id },
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
      where: { id_beneficiario_xalisco: id },
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
