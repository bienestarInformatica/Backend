import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SantaMariaOroBeneficiario } from './entities/santa-maria-oro-beneficiario.entity';
import { SantaMariaOroBeneficio } from './entities/santa-maria-oro-beneficio.entity';
import { SantaMariaOroDomicilioBeneficiario } from './entities/santa-maria-oro-domicilio.entity';
import { CreateSantaMariaOroBeneficiarioDto } from './dto/create-santa-maria-oro-beneficiario.dto';
import { CreateSantaMariaOroBeneficioDto } from './dto/create-santa-maria-oro-beneficio.dto';
import { CreateSantaMariaOroDomicilioDto } from './dto/create-santa-maria-oro-domicilio.dto';
import { UpdateSantaMariaOroCompletoDto } from './dto/update-santa-maria-oro-completo.dto';

@Injectable()
export class SantaMariaOroService {
  constructor(
    @InjectRepository(SantaMariaOroBeneficiario)
    private beneficiarioRepository: Repository<SantaMariaOroBeneficiario>,
    @InjectRepository(SantaMariaOroBeneficio)
    private beneficioRepository: Repository<SantaMariaOroBeneficio>,
    @InjectRepository(SantaMariaOroDomicilioBeneficiario)
    private domicilioRepository: Repository<SantaMariaOroDomicilioBeneficiario>,
  ) { }

  async createWithRelation(
    createSantaMariaOroBeneficiarioDto: CreateSantaMariaOroBeneficiarioDto,
    createSantaMariaOroBeneficioDto: CreateSantaMariaOroBeneficioDto,
    createSantaMariaOroDomicilioDto: CreateSantaMariaOroDomicilioDto,
  ): Promise<any> {
    const beneficiario = new SantaMariaOroBeneficiario();
    Object.assign(beneficiario, createSantaMariaOroBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new SantaMariaOroBeneficio();
    Object.assign(beneficio, createSantaMariaOroBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new SantaMariaOroDomicilioBeneficiario();
    Object.assign(domicilio, createSantaMariaOroDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateSantaMariaOroBeneficiarioDto[],
    beneficiosDto: CreateSantaMariaOroBeneficioDto[],
    domiciliosDto: CreateSantaMariaOroDomicilioDto[],
  ): Promise<any[]> {
    const resultados = [];

    for (let i = 0; i < beneficiariosDto.length; i++) {
      const beneficiarioDto = beneficiariosDto[i];
      const beneficioDto = beneficiosDto[i];
      const domicilioDto = domiciliosDto[i];

      const beneficiario = new SantaMariaOroBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new SantaMariaOroBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new SantaMariaOroDomicilioBeneficiario();
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
    updateDto: UpdateSantaMariaOroCompletoDto
  ): Promise<{ message: string }> {
    // Actualizar beneficiario
    const beneficiario = await this.beneficiarioRepository.findOne({
      where: { id_beneficiario_santamaria: id },
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
      where: { id_beneficiario_santamaria: id },
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
