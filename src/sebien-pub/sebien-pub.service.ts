import { ConflictException, Injectable } from '@nestjs/common';
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

  update(id: number, updateSebienPubDto: UpdateSebienPubDto) {
    return `This action updates a #${id} sebienPub`;
  }

  remove(id: number) {
    return `This action removes a #${id} sebienPub`;
  }
}
