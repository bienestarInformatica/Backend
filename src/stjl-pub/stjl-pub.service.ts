import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateStjlPubDto } from './dto/update-stjl-pub.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StjlBeneficiario } from './entities/stjl-beneficiario.entity';
import { StjlBeneficio } from './entities/stjl-beneficio.entity';
import { StjlDomicilioBeneficiario } from './entities/stjl-domicilio.entity';
import { CreateStjlBeneficiarioDto } from './dto/create-stjl-beneficiario.dto';
import { CreateStjlBeneficioDto } from './dto/create-stjl-beneficio.dto';
import { CreateStjlDomicilioDto } from './dto/create-stjl-domicilio.dto';

@Injectable()
export class StjlPubService {

  constructor(
    @InjectRepository(StjlBeneficiario)
    private beneficiarioRepository: Repository<StjlBeneficiario>,
    @InjectRepository(StjlBeneficio)
    private beneficioRepository: Repository<StjlBeneficio>,
    @InjectRepository(StjlDomicilioBeneficiario)
    private domicilioRepository: Repository<StjlDomicilioBeneficiario>,
  ){}
  
  async createWithRelation(
    createStjlBeneficiarioDto: CreateStjlBeneficiarioDto,
    createStjlBeneficioDto: CreateStjlBeneficioDto,
    createStjlDomicilioDto: CreateStjlDomicilioDto,
  ): Promise<any> {
    const beneficiario = new StjlBeneficiario();
    Object.assign(beneficiario, createStjlBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new StjlBeneficio();
    Object.assign(beneficio, createStjlBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new StjlDomicilioBeneficiario();
    Object.assign(domicilio, createStjlDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateStjlBeneficiarioDto[],
    beneficiosDto: CreateStjlBeneficioDto[],
    domiciliosDto: CreateStjlDomicilioDto[],
  ): Promise<any[]> {
    const resultados = [];

    for (let i = 0; i < beneficiariosDto.length; i++) {
      const beneficiarioDto = beneficiariosDto[i];
      const beneficioDto = beneficiosDto[i];
      const domicilioDto = domiciliosDto[i];

      const existingBeneficiario = await this.beneficiarioRepository.findOne({ where: { curp: beneficiarioDto.curp } });
    if (existingBeneficiario) {
      throw new ConflictException(`Ya existe un beneficiario con la CURP: ${beneficiarioDto.curp}`);
    }

      const beneficiario = new StjlBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new StjlBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new StjlDomicilioBeneficiario();
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

  async findByCurpWithRelations(curp: string): Promise<StjlBeneficiario | undefined> {
    return await this.beneficiarioRepository
      .createQueryBuilder('b')
      .leftJoinAndSelect('b.beneficios', 'bs')
      .leftJoinAndSelect('b.domicilios', 'idg')
      .where('b.curp = :curp', { curp })
      .getOne();
  }

  findAll() {
    return `This action returns all stjlPub`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stjlPub`;
  }

  update(id: number, updateStjlPubDto: UpdateStjlPubDto) {
    return `This action updates a #${id} stjlPub`;
  }

  remove(id: number) {
    return `This action removes a #${id} stjlPub`;
  }
}
