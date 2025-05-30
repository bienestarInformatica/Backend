import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IxtlanBeneficiario } from './entities/ixtlan-beneficiario.entity';
import { IxtlanBeneficio } from './entities/ixtlan-beneficio.entity';
import { IxtlanDomicilioBeneficiario } from './entities/ixtlan-domicilio.entity';
import { CreateIxtlanBeneficiarioDto } from './dto/create-ixtlan-beneficiario.dto';
import { CreateIxtlanDomicilioDto } from './dto/create-ixtlan-domicilio.dto';
import { CreateIxtlanBeneficioDto } from './dto/create-ixtlan-beneficio.dto';
import { UpdateIxtlanCompletoDto } from './dto/update-ixtlan-completo.dto';

@Injectable()
export class IxtlanService {
  constructor(
    @InjectRepository(IxtlanBeneficiario)
    private beneficiarioRepository: Repository<IxtlanBeneficiario>,
    @InjectRepository(IxtlanBeneficio)
    private beneficioRepository: Repository<IxtlanBeneficio>,
    @InjectRepository(IxtlanDomicilioBeneficiario)
    private domicilioRepository: Repository<IxtlanDomicilioBeneficiario>,
  ) { }

  async createWithRelation(
    createIxtlanBeneficiarioDto: CreateIxtlanBeneficiarioDto,
    createIxtlanBeneficioDto: CreateIxtlanBeneficioDto,
    createIxtlanDomicilioDto: CreateIxtlanDomicilioDto,
  ): Promise<any> {
    const beneficiario = new IxtlanBeneficiario();
    Object.assign(beneficiario, createIxtlanBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new IxtlanBeneficio();
    Object.assign(beneficio, createIxtlanBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new IxtlanDomicilioBeneficiario();
    Object.assign(domicilio, createIxtlanDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateIxtlanBeneficiarioDto[],
    beneficiosDto: CreateIxtlanBeneficioDto[],
    domiciliosDto: CreateIxtlanDomicilioDto[],
  ): Promise<any[]> {
    const resultados = [];

    for (let i = 0; i < beneficiariosDto.length; i++) {
      const beneficiarioDto = beneficiariosDto[i];
      const beneficioDto = beneficiosDto[i];
      const domicilioDto = domiciliosDto[i];

      const beneficiario = new IxtlanBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new IxtlanBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new IxtlanDomicilioBeneficiario();
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
    updateDto: UpdateIxtlanCompletoDto
  ): Promise<{ message: string }> {
    // Actualizar beneficiario
    const beneficiario = await this.beneficiarioRepository.findOne({
      where: { id_beneficiario_ixtlan: id },
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
      where: { id_beneficiario_ixtlan: id },
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
