import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RosamoradaBeneficiario } from './entities/rosamorada-beneficiario.entity';
import { RosamoradaBeneficio } from './entities/rosamorada-beneficio.entity';
import { RosamoradaDomicilioBeneficiario } from './entities/rosamorada-domicilio.entity';
import { CreateRosamoradaBeneficiarioDto } from './dto/create-rosamorada-beneficiario.dto';
import { CreateRosamoradaBeneficioDto } from './dto/create-rosamorada-beneficio.dto';
import { CreateRosamoradaDomicilioDto } from './dto/create-rosamorada-domicilio.dto';
import { UpdateRosamoradaCompletoDto } from './dto/update-rosamorada-completo.dto';

@Injectable()
export class RosamoradaService {
  constructor(
    @InjectRepository(RosamoradaBeneficiario)
    private beneficiarioRepository: Repository<RosamoradaBeneficiario>,
    @InjectRepository(RosamoradaBeneficio)
    private beneficioRepository: Repository<RosamoradaBeneficio>,
    @InjectRepository(RosamoradaDomicilioBeneficiario)
    private domicilioRepository: Repository<RosamoradaDomicilioBeneficiario>,
  ) { }

  async createWithRelation(
    createRosamoradaBeneficiarioDto: CreateRosamoradaBeneficiarioDto,
    createRosamoradaBeneficioDto: CreateRosamoradaBeneficioDto,
    createRosamoradaDomicilioDto: CreateRosamoradaDomicilioDto,
  ): Promise<any> {
    const beneficiario = new RosamoradaBeneficiario();
    Object.assign(beneficiario, createRosamoradaBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new RosamoradaBeneficio();
    Object.assign(beneficio, createRosamoradaBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new RosamoradaDomicilioBeneficiario();
    Object.assign(domicilio, createRosamoradaDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateRosamoradaBeneficiarioDto[],
    beneficiosDto: CreateRosamoradaBeneficioDto[],
    domiciliosDto: CreateRosamoradaDomicilioDto[],
  ): Promise<any[]> {
    const resultados = [];

    for (let i = 0; i < beneficiariosDto.length; i++) {
      const beneficiarioDto = beneficiariosDto[i];
      const beneficioDto = beneficiosDto[i];
      const domicilioDto = domiciliosDto[i];

      const beneficiario = new RosamoradaBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new RosamoradaBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new RosamoradaDomicilioBeneficiario();
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
    updateDto: UpdateRosamoradaCompletoDto
  ): Promise<{ message: string }> {
    // Actualizar beneficiario
    const beneficiario = await this.beneficiarioRepository.findOne({
      where: { id_beneficiario_rosamorada: id },
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
      where: { id_beneficiario_rosamorada: id },
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
