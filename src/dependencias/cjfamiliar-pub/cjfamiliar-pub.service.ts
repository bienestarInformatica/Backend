import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateCjfamiliarPubDto } from './dto/update-cjfamiliar-pub.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CjfamiliarBeneficiario } from './entities/cjfamiliar-beneficiario.entity';
import { CjfamiliarBeneficio } from './entities/cjfamiliar-beneficio.entity';
import { CjfamiliarDomicilioBeneficiario } from './entities/cjfamiliar-domicilio.entity';
import { CreateCjfamiliarBeneficiarioDto } from './dto/create-cjfamiliar-beneficiario.dto';
import { CreateCjfamiliarBeneficioDto } from './dto/create-cjfamiliar-beneficio.dto';
import { CreateCjfamiliarDomicilioDto } from './dto/create-cjfamiliar-domicilio.dto';

@Injectable()
export class CjfamiliarPubService {
  constructor(
    @InjectRepository(CjfamiliarBeneficiario)
    private beneficiarioRepository: Repository<CjfamiliarBeneficiario>,
    @InjectRepository(CjfamiliarBeneficio)
    private beneficioRepository: Repository<CjfamiliarBeneficio>,
    @InjectRepository(CjfamiliarDomicilioBeneficiario)
    private domicilioRepository: Repository<CjfamiliarDomicilioBeneficiario>
  ) { }

  async createWithRelation(
    createCjfamiliarBeneficiarioDto: CreateCjfamiliarBeneficiarioDto,
    createCjfamiliarBeneficioDto: CreateCjfamiliarBeneficioDto,
    createCjfamiliarDomicilioDto: CreateCjfamiliarDomicilioDto,
  ): Promise<any> {
    const beneficiario = new CjfamiliarBeneficiario();
    Object.assign(beneficiario, createCjfamiliarBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new CjfamiliarBeneficio();
    Object.assign(beneficio, createCjfamiliarBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new CjfamiliarDomicilioBeneficiario();
    Object.assign(domicilio, createCjfamiliarDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateCjfamiliarBeneficiarioDto[],
    beneficiosDto: CreateCjfamiliarBeneficioDto[],
    domiciliosDto: CreateCjfamiliarDomicilioDto[],
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

      const beneficiario = new CjfamiliarBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new CjfamiliarBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new CjfamiliarDomicilioBeneficiario();
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
    return `This action returns a #${id} cjfamiliarPub`;
  }

  update(id: number, updateCjfamiliarPubDto: UpdateCjfamiliarPubDto) {
    return `This action updates a #${id} cjfamiliarPub`;
  }

  remove(id: number) {
    return `This action removes a #${id} cjfamiliarPub`;
  }
}
