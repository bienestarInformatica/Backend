import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateEconomiaPubDto } from './dto/update-economia-pub.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EconomiaBeneficiario } from './entities/economia-beneficiario.entity';
import { EconomiaBeneficio } from './entities/economia-beneficio.entity';
import { EconomiaDomicilioBeneficiario } from './entities/economia-domicilio.entity';
import { CreateEconomiaBeneficiarioDto } from './dto/create-economia-beneficiario.dto';
import { CreateEconomiaBeneficioDto } from './dto/create-economia-beneficio.dto';
import { CreateEconomiaDomicilioDto } from './dto/create-economia-domicilio.dto';

@Injectable()
export class EconomiaPubService {
  constructor(
    @InjectRepository(EconomiaBeneficiario)
    private beneficiarioRepository: Repository<EconomiaBeneficiario>,
    @InjectRepository(EconomiaBeneficio)
    private beneficioRepository: Repository<EconomiaBeneficio>,
    @InjectRepository(EconomiaDomicilioBeneficiario)
    private domicilioRepository: Repository<EconomiaDomicilioBeneficiario>
  ) { }

  async createWithRelation(
    createEconomiaBeneficiarioDto: CreateEconomiaBeneficiarioDto,
    createEconomiaBeneficioDto: CreateEconomiaBeneficioDto,
    createEconomiaDomicilioDto: CreateEconomiaDomicilioDto,
  ): Promise<any> {
    const beneficiario = new EconomiaBeneficiario();
    Object.assign(beneficiario, createEconomiaBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new EconomiaBeneficio();
    Object.assign(beneficio, createEconomiaBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new EconomiaDomicilioBeneficiario();
    Object.assign(domicilio, createEconomiaDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateEconomiaBeneficiarioDto[],
    beneficiosDto: CreateEconomiaBeneficioDto[],
    domiciliosDto: CreateEconomiaDomicilioDto[],
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

      const beneficiario = new EconomiaBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new EconomiaBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new EconomiaDomicilioBeneficiario();
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
    return `This action returns a #${id} economiaPub`;
  }

  update(id: number, updateEconomiaPubDto: UpdateEconomiaPubDto) {
    return `This action updates a #${id} economiaPub`;
  }

  remove(id: number) {
    return `This action removes a #${id} economiaPub`;
  }
}
