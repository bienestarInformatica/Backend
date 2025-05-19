import { Injectable } from '@nestjs/common';
import { UpdateTepicDto } from './dto/update-tepic.dto';
import { CreateTepicBeneficiarioDto } from './dto/create-tepic-beneficiario.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TepicBeneficiario } from './entities/tepic-beneficiario.entity';
import { TepicBeneficio } from './entities/tepic-beneficio.entity';
import { TepicDomicilioBeneficiario } from './entities/tepic-domicilio.entity';
import { CreateTepicBeneficioDto } from './dto/create-tepic-beneficio.dto';
import { CreateTepicDomicilioDto } from './dto/create-tepic-domicilio.dto';

@Injectable()
export class TepicService {

  constructor(
    @InjectRepository(TepicBeneficiario)
    private beneficiarioRepository: Repository<TepicBeneficiario>,
    @InjectRepository(TepicBeneficio)
    private beneficioRepository: Repository<TepicBeneficio>,
    @InjectRepository(TepicDomicilioBeneficiario)
    private domicilioRepository: Repository<TepicDomicilioBeneficiario>,
  ) { }

  async createWithRelation(
    createTepicBeneficiarioDto: CreateTepicBeneficiarioDto,
    createTepicBeneficioDto: CreateTepicBeneficioDto,
    createTepicDomicilioDto: CreateTepicDomicilioDto,
  ): Promise<any> {
    const beneficiario = new TepicBeneficiario();
    Object.assign(beneficiario, createTepicBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new TepicBeneficio();
    Object.assign(beneficio, createTepicBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new TepicDomicilioBeneficiario();
    Object.assign(domicilio, createTepicDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateTepicBeneficiarioDto[],
    beneficiosDto: CreateTepicBeneficioDto[],
    domiciliosDto: CreateTepicDomicilioDto[],
  ): Promise<any[]> {
    const resultados = [];

    for (let i = 0; i < beneficiariosDto.length; i++) {
      const beneficiarioDto = beneficiariosDto[i];
      const beneficioDto = beneficiosDto[i];
      const domicilioDto = domiciliosDto[i];

      const beneficiario = new TepicBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new TepicBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new TepicDomicilioBeneficiario();
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

  findOne(id: number) {
    return `This action returns a #${id} tepic`;
  }

  update(id: number, updateTepicDto: UpdateTepicDto) {
    return `This action updates a #${id} tepic`;
  }

  remove(id: number) {
    return `This action removes a #${id} tepic`;
  }
}
