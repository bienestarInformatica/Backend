import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateInjuvePubDto } from './dto/update-injuve-pub.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjuveBeneficiario } from './entities/injuve-beneficiario.entity';
import { InjuveDomicilioBeneficiario } from './entities/injuve-domicilio.entity';
import { InjuveBeneficio } from './entities/injuve-beneficio.entity';
import { CreateInjuveBeneficiarioDto } from './dto/create-injuve-beneficiario.dto';
import { CreateInjuveBeneficioDto } from './dto/create-injuve-beneficio.dto';
import { CreateInjuveDomicilioDto } from './dto/create-injuve-domicilio.dto';

@Injectable()
export class InjuvePubService {
  constructor(
    @InjectRepository(InjuveBeneficiario)
    private beneficiarioRepository: Repository<InjuveBeneficiario>,
    @InjectRepository(InjuveBeneficio)
    private beneficioRepository: Repository<InjuveBeneficio>,
    @InjectRepository(InjuveDomicilioBeneficiario)
    private domicilioRepository: Repository<InjuveDomicilioBeneficiario>,
  ){}
  
  async createWithRelation(
    createInjuveBeneficiarioDto: CreateInjuveBeneficiarioDto,
    createInjuveBeneficioDto: CreateInjuveBeneficioDto,
    createInjuveDomicilioDto: CreateInjuveDomicilioDto,
  ): Promise<any> {
    const beneficiario = new InjuveBeneficiario();
    Object.assign(beneficiario, createInjuveBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new InjuveBeneficio();
    Object.assign(beneficio, createInjuveBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new InjuveDomicilioBeneficiario();
    Object.assign(domicilio, createInjuveDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateInjuveBeneficiarioDto[],
    beneficiosDto: CreateInjuveBeneficioDto[],
    domiciliosDto: CreateInjuveDomicilioDto[],
  ): Promise<any[]> {
    const resultados = [];

    for (let i = 0; i < beneficiariosDto.length; i++) {
      const beneficiarioDto = beneficiariosDto[i];
      const beneficioDto = beneficiosDto[i];
      const domicilioDto = domiciliosDto[i];

      const beneficiario = new InjuveBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new InjuveBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new InjuveDomicilioBeneficiario();
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


  async findByCurpWithRelations(curp: string): Promise<InjuveBeneficiario | undefined> {
    return await this.beneficiarioRepository
      .createQueryBuilder('b')
      .leftJoinAndSelect('b.beneficios', 'bs')
      .leftJoinAndSelect('b.domicilios', 'idg')
      .where('b.curp = :curp', { curp })
      .getOne();
  }

  findOne(id: number) {
    return `This action returns a #${id} injuvePub`;
  }

  update(id: number, updateInjuvePubDto: UpdateInjuvePubDto) {
    return `This action updates a #${id} injuvePub`;
  }

  remove(id: number) {
    return `This action removes a #${id} injuvePub`;
  }
}
