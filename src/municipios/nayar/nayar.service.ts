import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NayarBeneficiario } from './entities/nayar-beneficiario.entity';
import { NayarBeneficio } from './entities/nayar-beneficio.entity';
import { NayarDomicilioBeneficiario } from './entities/nayar-domicilio.entity';
import { CreateNayarBeneficiarioDto } from './dto/create-nayar-beneficiario.dto';
import { CreateNayarBeneficioDto } from './dto/create-nayar-beneficio.dto';
import { CreateNayarDomicilioDto } from './dto/create-nayar-domicilio.dto';
import { UpdateNayarCompletoDto } from './dto/update-nayar-completo.dto';

@Injectable()
export class NayarService {
  constructor(
    @InjectRepository(NayarBeneficiario)
    private beneficiarioRepository: Repository<NayarBeneficiario>,
    @InjectRepository(NayarBeneficio)
    private beneficioRepository: Repository<NayarBeneficio>,
    @InjectRepository(NayarDomicilioBeneficiario)
    private domicilioRepository: Repository<NayarDomicilioBeneficiario>,
  ) { }

  async createWithRelation(
    createNayarBeneficiarioDto: CreateNayarBeneficiarioDto,
    createNayarBeneficioDto: CreateNayarBeneficioDto,
    createNayarDomicilioDto: CreateNayarDomicilioDto,
  ): Promise<any> {
    const beneficiario = new NayarBeneficiario();
    Object.assign(beneficiario, createNayarBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new NayarBeneficio();
    Object.assign(beneficio, createNayarBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new NayarDomicilioBeneficiario();
    Object.assign(domicilio, createNayarDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateNayarBeneficiarioDto[],
    beneficiosDto: CreateNayarBeneficioDto[],
    domiciliosDto: CreateNayarDomicilioDto[],
  ): Promise<any[]> {
    const resultados = [];

    for (let i = 0; i < beneficiariosDto.length; i++) {
      const beneficiarioDto = beneficiariosDto[i];
      const beneficioDto = beneficiosDto[i];
      const domicilioDto = domiciliosDto[i];

      const beneficiario = new NayarBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new NayarBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new NayarDomicilioBeneficiario();
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
    updateDto: UpdateNayarCompletoDto
  ): Promise<{ message: string }> {
    // Actualizar beneficiario
    const beneficiario = await this.beneficiarioRepository.findOne({
      where: { id_beneficiario_nayar: id },
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
      where: { id_beneficiario_nayar: id },
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
