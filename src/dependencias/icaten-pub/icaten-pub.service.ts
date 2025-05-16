import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateIcatenPubDto } from './dto/update-icaten-pub.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IcatenBeneficiario } from './entities/icaten-beneficiario.entity';
import { IcatenBeneficio } from './entities/icaten-beneficio.entity';
import { IcatenDomicilioBeneficiario } from './entities/icaten-domicilio.entity';
import { CreateIcatenBeneficiarioDto } from './dto/create-icaten-beneficiario.dto';
import { CreateIcatenBeneficioDto } from './dto/create-icaten-beneficio.dto';
import { CreateIcatenDomicilioDto } from './dto/create-icaten-domicilio.dto';

@Injectable()
export class IcatenPubService {
  constructor(
    @InjectRepository(IcatenBeneficiario)
    private beneficiarioRepository: Repository<IcatenBeneficiario>,
    @InjectRepository(IcatenBeneficio)
    private beneficioRepository: Repository<IcatenBeneficio>,
    @InjectRepository(IcatenDomicilioBeneficiario)
    private domicilioRepository: Repository<IcatenDomicilioBeneficiario>
  ) { }

  async createWithRelation(
    createIcatenBeneficiarioDto: CreateIcatenBeneficiarioDto,
    createIcatenBeneficioDto: CreateIcatenBeneficioDto,
    createIcatenDomicilioDto: CreateIcatenDomicilioDto,
  ): Promise<any> {
    const beneficiario = new IcatenBeneficiario();
    Object.assign(beneficiario, createIcatenBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new IcatenBeneficio();
    Object.assign(beneficio, createIcatenBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new IcatenDomicilioBeneficiario();
    Object.assign(domicilio, createIcatenDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateIcatenBeneficiarioDto[],
    beneficiosDto: CreateIcatenBeneficioDto[],
    domiciliosDto: CreateIcatenDomicilioDto[],
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

      const beneficiario = new IcatenBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new IcatenBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new IcatenDomicilioBeneficiario();
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
  }

  findOne(id: number) {
    return `This action returns a #${id} icatenPub`;
  }

  update(id: number, updateIcatenPubDto: UpdateIcatenPubDto) {
    return `This action updates a #${id} icatenPub`;
  }

  remove(id: number) {
    return `This action removes a #${id} icatenPub`;
  }
}
