import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateIprovinayPubDto } from './dto/update-iprovinay-pub.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IprovinayBeneficiario } from './entities/iprovinay-beneficiario.entity';
import { IprovinayBeneficio } from './entities/iprovinay-beneficio.entity';
import { IprovinayDomicilioBeneficiario } from './entities/iprovinay-domicilio.entity';
import { CreateIprovinayBeneficiarioDto } from './dto/create-iprovinay-beneficiario.dto';
import { CreateIprovinayBeneficioDto } from './dto/create-iprovinay-beneficio.dto';
import { CreateIprovinayDomicilioDto } from './dto/create-iprovinay-domicilio.dto';

@Injectable()
export class IprovinayPubService {
  constructor(
    @InjectRepository(IprovinayBeneficiario)
    private beneficiarioRepository: Repository<IprovinayBeneficiario>,
    @InjectRepository(IprovinayBeneficio)
    private beneficioRepository: Repository<IprovinayBeneficio>,
    @InjectRepository(IprovinayDomicilioBeneficiario)
    private domicilioRepository: Repository<IprovinayDomicilioBeneficiario>,
  ){}
  
  async createWithRelation(
    createIprovinayBeneficiarioDto: CreateIprovinayBeneficiarioDto,
    createIprovinayBeneficioDto: CreateIprovinayBeneficioDto,
    createIprovinayDomicilioDto: CreateIprovinayDomicilioDto,
  ): Promise<any> {
    const beneficiario = new IprovinayBeneficiario();
    Object.assign(beneficiario, createIprovinayBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new IprovinayBeneficio();
    Object.assign(beneficio, createIprovinayBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new IprovinayDomicilioBeneficiario();
    Object.assign(domicilio, createIprovinayDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateIprovinayBeneficiarioDto[],
    beneficiosDto: CreateIprovinayBeneficioDto[],
    domiciliosDto: CreateIprovinayDomicilioDto[],
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

      const beneficiario = new IprovinayBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new IprovinayBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new IprovinayDomicilioBeneficiario();
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

  async findByCurpWithRelations(curp: string): Promise<IprovinayBeneficiario | undefined> {
    return await this.beneficiarioRepository
      .createQueryBuilder('b')
      .leftJoinAndSelect('b.beneficios', 'bs')
      .leftJoinAndSelect('b.domicilios', 'idg')
      .where('b.curp = :curp', { curp })
      .getOne();
  }

  findOne(id: number) {
    return `This action returns a #${id} iprovinayPub`;
  }

  update(id: number, updateIprovinayPubDto: UpdateIprovinayPubDto) {
    return `This action updates a #${id} iprovinayPub`;
  }

  remove(id: number) {
    return `This action removes a #${id} iprovinayPub`;
  }
}
