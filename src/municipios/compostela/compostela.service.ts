import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCompostelaDto } from './dto/update-compostela.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompostelaBeneficiario } from './entities/compostela-beneficiario.entity';
import { CompostelaBeneficio } from './entities/compostela-beneficio.entity';
import { CompostelaDomicilioBeneficiario } from './entities/compostela-domicilio.entity';
import { CreateCompostelaBeneficiarioDto } from './dto/create-compostela-beneficiario.dto';
import { CreateCompostelaBeneficioDto } from './dto/create-compostela-beneficio.dto';
import { CreateCompostelaDomicilioDto } from './dto/create-compostela-domicilio.dto';
import { UpdateCompostelaCompletoDto } from './dto/update-compostela-completo.dto';

@Injectable()
export class CompostelaService {
  constructor(
    @InjectRepository(CompostelaBeneficiario)
    private beneficiarioRepository: Repository<CompostelaBeneficiario>,
    @InjectRepository(CompostelaBeneficio)
    private beneficioRepository: Repository<CompostelaBeneficio>,
    @InjectRepository(CompostelaDomicilioBeneficiario)
    private domicilioRepository: Repository<CompostelaDomicilioBeneficiario>,
  ) { }

  async createWithRelation(
    createCompostelaBeneficiarioDto: CreateCompostelaBeneficiarioDto,
    createCompostelaBeneficioDto: CreateCompostelaBeneficioDto,
    createCompostelaDomicilioDto: CreateCompostelaDomicilioDto,
  ): Promise<any> {
    const beneficiario = new CompostelaBeneficiario();
    Object.assign(beneficiario, createCompostelaBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new CompostelaBeneficio();
    Object.assign(beneficio, createCompostelaBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new CompostelaDomicilioBeneficiario();
    Object.assign(domicilio, createCompostelaDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateCompostelaBeneficiarioDto[],
    beneficiosDto: CreateCompostelaBeneficioDto[],
    domiciliosDto: CreateCompostelaDomicilioDto[],
  ): Promise<any[]> {
    const resultados = [];

    for (let i = 0; i < beneficiariosDto.length; i++) {
      const beneficiarioDto = beneficiariosDto[i];
      const beneficioDto = beneficiosDto[i];
      const domicilioDto = domiciliosDto[i];

      const beneficiario = new CompostelaBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new CompostelaBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new CompostelaDomicilioBeneficiario();
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
    updateDto: UpdateCompostelaCompletoDto
  ): Promise<{ message: string }> {
    // Actualizar beneficiario
    const beneficiario = await this.beneficiarioRepository.findOne({
      where: { id_beneficiario_compostela: id },
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
      where: { id_beneficiario_compostela: id },
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
