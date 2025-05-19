import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateJalaDto } from './dto/update-jala.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JalaBeneficiario } from './entities/jala-beneficiario.entity';
import { JalaBeneficio } from './entities/jala-beneficio.entity';
import { Repository } from 'typeorm';
import { JalaDomicilioBeneficiario } from './entities/jala-domicilio.entity';
import { CreateJalaBeneficiarioDto } from './dto/create-jala-beneficiario.dto';
import { CreateJalaBeneficioDto } from './dto/create-jala-beneficio.dto';
import { CreateJalaDomicilioDto } from './dto/create-jala-domicilio.dto';

@Injectable()
export class JalaService {

  constructor(
    @InjectRepository(JalaBeneficiario)
    private beneficiarioRepository: Repository<JalaBeneficiario>,
    @InjectRepository(JalaBeneficio)
    private beneficioRepository: Repository<JalaBeneficio>,
    @InjectRepository(JalaDomicilioBeneficiario)
    private domicilioRepository: Repository<JalaDomicilioBeneficiario>,
  ) { }

  async createWithRelation(
    createJalaBeneficiarioDto: CreateJalaBeneficiarioDto,
    createJalaBeneficioDto: CreateJalaBeneficioDto,
    createJalaDomicilioDto: CreateJalaDomicilioDto,
  ): Promise<any> {
    const beneficiario = new JalaBeneficiario();
    Object.assign(beneficiario, createJalaBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new JalaBeneficio();
    Object.assign(beneficio, createJalaBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new JalaDomicilioBeneficiario();
    Object.assign(domicilio, createJalaDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateJalaBeneficiarioDto[],
    beneficiosDto: CreateJalaBeneficioDto[],
    domiciliosDto: CreateJalaDomicilioDto[],
  ): Promise<any[]> {
    const resultados = [];

    for (let i = 0; i < beneficiariosDto.length; i++) {
      const beneficiarioDto = beneficiariosDto[i];
      const beneficioDto = beneficiosDto[i];
      const domicilioDto = domiciliosDto[i];

      const beneficiario = new JalaBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new JalaBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new JalaDomicilioBeneficiario();
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

  findAll() {
    return `This action returns all jala`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jala`;
  }

  async update(id: number, updateDto: UpdateJalaDto): Promise<{ message: string }> {
      const beneficiario = await this.beneficiarioRepository.findOne({
        where: { id_beneficiario_jala: id },
      });
      if (!beneficiario) {
        throw new NotFoundException(`No se encontró el beneficiario con ID ${id}`);
      }
      Object.assign(beneficiario, updateDto);
      await this.beneficiarioRepository.save(beneficiario);
      return { message: `El beneficiario con ID ${id} fue actualizado correctamente` };
    }

  async remove(id: number): Promise<{ message: string }> {
    const beneficiario = await this.beneficiarioRepository.findOne({
      where: { id_beneficiario_jala: id },
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
