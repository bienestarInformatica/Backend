import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SebienBeneficiario } from './entities/sebien-beneficiario.entity';
import { SebienBeneficio } from './entities/sebien-beneficio.entity';
import { SebienDomicilioBeneficiario } from './entities/sebien-domicilio.entity';
import { CreateSebienBeneficiarioDto } from './dto/create-sebien-beneficiario.dto';
import { CreateSebienBeneficioDto } from './dto/create-sebien-beneficio.dto';
import { CreateSebienDomicilioDto } from './dto/create-sebien-domicilio.dto';
import { UpdateSebienPubDto } from './dto/update-sebien-pub.dto';

@Injectable()
export class SebienPubService {

  constructor(
    @InjectRepository(SebienBeneficiario)
    private beneficiarioRepository: Repository<SebienBeneficiario>,
    @InjectRepository(SebienBeneficio)
    private beneficioRepository: Repository<SebienBeneficio>,
    @InjectRepository(SebienDomicilioBeneficiario)
    private domicilioRepository: Repository<SebienDomicilioBeneficiario>,
  ) {}

  async createWithRelation(
    createSebienBeneficiarioDto: CreateSebienBeneficiarioDto,
    createSebienBeneficioDto: CreateSebienBeneficioDto,
    createSebienDomicilioDto: CreateSebienDomicilioDto,
  ): Promise<any> {
    const beneficiario = new SebienBeneficiario();
    Object.assign(beneficiario, createSebienBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new SebienBeneficio();
    Object.assign(beneficio, createSebienBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new SebienDomicilioBeneficiario();
    Object.assign(domicilio, createSebienDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateSebienBeneficiarioDto[],
    beneficiosDto: CreateSebienBeneficioDto[],
    domiciliosDto: CreateSebienDomicilioDto[],
  ): Promise<any[]> {
    const resultados = [];

    for (let i = 0; i < beneficiariosDto.length; i++) {
      const beneficiarioDto = beneficiariosDto[i];
      const beneficioDto = beneficiosDto[i];
      const domicilioDto = domiciliosDto[i];

    //   const existingBeneficiario = await this.beneficiarioRepository.findOne({ where: { curp: beneficiarioDto.curp } });
    // if (existingBeneficiario) {
    //   throw new ConflictException(`Ya existe un beneficiario con la CURP: ${beneficiarioDto.curp}`);
    // }

      const beneficiario = new SebienBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new SebienBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new SebienDomicilioBeneficiario();
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

  async findByCurpWithRelations(curp: string): Promise<SebienBeneficiario | undefined> {
    return await this.beneficiarioRepository
      .createQueryBuilder('b')
      .leftJoinAndSelect('b.beneficios', 'bs')
      .leftJoinAndSelect('b.domicilios', 'idg')
      .where('b.curp = :curp', { curp })
      .getOne();
  }

  findOne(id: number) {
    return `This action returns a #${id} sebienPub`;
  }

  async update(id: number, updateDto: UpdateSebienPubDto): Promise<{ message: string }> {
    const beneficiario = await this.beneficiarioRepository.findOne({
      where: { id_beneficiario_sebien: id },
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
      where: { id_beneficiario_sebien: id },
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
