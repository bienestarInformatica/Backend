import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateCecanPubDto } from './dto/update-cecan-pub.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CecanBeneficiario } from './entities/cecan-beneficiario.entity';
import { CecanBeneficio } from './entities/cecan-beneficio.entity';
import { CecanDomicilioBeneficiario } from './entities/cecan-domicilio.entity';
import { CreateCecanBeneficiarioDto } from './dto/create-cecan-beneficiario.dto';
import { CreateCecanBeneficioDto } from './dto/create-cecan-beneficio.dto';
import { CreateCecanDomicilioDto } from './dto/create-cecan.domicilio.dto';

@Injectable()
export class CecanPubService {
  constructor(
    @InjectRepository(CecanBeneficiario)
    private beneficiarioRepository: Repository<CecanBeneficiario>,
    @InjectRepository(CecanBeneficio)
    private beneficioRepository: Repository<CecanBeneficio>,
    @InjectRepository(CecanDomicilioBeneficiario)
    private domicilioRepository: Repository<CecanDomicilioBeneficiario>,
  ) { }

  async createWithRelation(
    createCecanBeneficiarioDto: CreateCecanBeneficiarioDto,
    createCecanBeneficioDto: CreateCecanBeneficioDto,
    createCecanDomicilioDto: CreateCecanDomicilioDto,
  ): Promise<any> {
    const beneficiario = new CecanBeneficiario();
    Object.assign(beneficiario, createCecanBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new CecanBeneficio();
    Object.assign(beneficio, createCecanBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new CecanDomicilioBeneficiario();
    Object.assign(domicilio, createCecanDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateCecanBeneficiarioDto[],
    beneficiosDto: CreateCecanBeneficioDto[],
    domiciliosDto: CreateCecanDomicilioDto[],
  ): Promise<any[]> {
    const resultados = [];

    for (let i = 0; i < beneficiariosDto.length; i++) {
      const beneficiarioDto = beneficiariosDto[i];
      const beneficioDto = beneficiosDto[i];
      const domicilioDto = domiciliosDto[i];

      const beneficiario = new CecanBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new CecanBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new CecanDomicilioBeneficiario();
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

  async findByCurpWithRelations(curp: string): Promise<CecanBeneficiario | undefined> {
    return await this.beneficiarioRepository
      .createQueryBuilder('b')
      .leftJoinAndSelect('b.beneficios', 'bs')
      .leftJoinAndSelect('b.domicilios', 'idg')
      .where('b.curp = :curp', { curp })
      .getOne();
  }

  findOne(id: number) {
    return `This action returns a #${id} cecanPub`;
  }

  update(id: number, updateCecanPubDto: UpdateCecanPubDto) {
    return `This action updates a #${id} cecanPub`;
  }

  remove(id: number) {
    return `This action removes a #${id} cecanPub`;
  }
}
