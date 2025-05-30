import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RuizBeneficiario } from './entities/ruiz-beneficiario.entity';
import { RuizBeneficio } from './entities/ruiz-beneficio.entity';
import { RuizDomicilioBeneficiario } from './entities/ruiz-domicilio.entity';
import { CreateRuizBeneficiarioDto } from './dto/create-ruiz-beneficiario.dto';
import { CreateRuizBeneficioDto } from './dto/create-ruiz-beneficio.dto';
import { CreateRuizDomicilioDto } from './dto/create-ruiz-domicilio.dto';
import { UpdateRuizCompletoDto } from './dto/update-ruiz-completo.dto';

@Injectable()
export class RuizService {
  constructor(
    @InjectRepository(RuizBeneficiario)
    private beneficiarioRepository: Repository<RuizBeneficiario>,
    @InjectRepository(RuizBeneficio)
    private beneficioRepository: Repository<RuizBeneficio>,
    @InjectRepository(RuizDomicilioBeneficiario)
    private domicilioRepository: Repository<RuizDomicilioBeneficiario>,
  ) { }

  async createWithRelation(
    createRuizBeneficiarioDto: CreateRuizBeneficiarioDto,
    createRuizBeneficioDto: CreateRuizBeneficioDto,
    createRuizDomicilioDto: CreateRuizDomicilioDto,
  ): Promise<any> {
    const beneficiario = new RuizBeneficiario();
    Object.assign(beneficiario, createRuizBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new RuizBeneficio();
    Object.assign(beneficio, createRuizBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new RuizDomicilioBeneficiario();
    Object.assign(domicilio, createRuizDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateRuizBeneficiarioDto[],
    beneficiosDto: CreateRuizBeneficioDto[],
    domiciliosDto: CreateRuizDomicilioDto[],
  ): Promise<any[]> {
    const resultados = [];

    for (let i = 0; i < beneficiariosDto.length; i++) {
      const beneficiarioDto = beneficiariosDto[i];
      const beneficioDto = beneficiosDto[i];
      const domicilioDto = domiciliosDto[i];

      const beneficiario = new RuizBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new RuizBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new RuizDomicilioBeneficiario();
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
    updateDto: UpdateRuizCompletoDto
  ): Promise<{ message: string }> {
    // Actualizar beneficiario
    const beneficiario = await this.beneficiarioRepository.findOne({
      where: { id_beneficiario_ruiz: id },
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
      where: { id_beneficiario_ruiz: id },
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
