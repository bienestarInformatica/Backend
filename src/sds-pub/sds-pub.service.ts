import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateSdsPubDto } from './dto/update-sds-pub.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SdsBeneficiario } from './entities/sds-beneficiario.entity';
import { Repository } from 'typeorm';
import { SdsBeneficio } from './entities/sds-beneficio.entity';
import { SdsDomicilioBeneficiario } from './entities/sds-domicilio.entity';
import { CreateSdsBeneficiarioDto } from './dto/create-sds-beneficiario.dto';
import { CreateSdsBeneficioDto } from './dto/create-sds-beneficio.dto';
import { CreateSdsDomicilioDto } from './dto/create-sds-domicilio.dto';

@Injectable()
export class SdsPubService {
  constructor(
    @InjectRepository(SdsBeneficiario)
    private beneficiarioRepository: Repository<SdsBeneficiario>,
    @InjectRepository(SdsBeneficio)
    private beneficioRepository: Repository<SdsBeneficio>,
    @InjectRepository(SdsDomicilioBeneficiario)
    private domicilioRepository: Repository<SdsDomicilioBeneficiario>
  ) { }

  async createWithRelation(
    createSdsBeneficiarioDto: CreateSdsBeneficiarioDto,
    createSdsBeneficioDto: CreateSdsBeneficioDto,
    createSdsDomicilioDto: CreateSdsDomicilioDto,
  ): Promise<any> {
    const beneficiario = new SdsBeneficiario();
    Object.assign(beneficiario, createSdsBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new SdsBeneficio();
    Object.assign(beneficio, createSdsBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new SdsDomicilioBeneficiario();
    Object.assign(domicilio, createSdsDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateSdsBeneficiarioDto[],
    beneficiosDto: CreateSdsBeneficioDto[],
    domiciliosDto: CreateSdsDomicilioDto[],
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

      const beneficiario = new SdsBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new SdsBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new SdsDomicilioBeneficiario();
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
    return `This action returns all sdsPub`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sdsPub`;
  }

  update(id: number, updateSdsPubDto: UpdateSdsPubDto) {
    return `This action updates a #${id} sdsPub`;
  }

  remove(id: number) {
    return `This action removes a #${id} sdsPub`;
  }
}
