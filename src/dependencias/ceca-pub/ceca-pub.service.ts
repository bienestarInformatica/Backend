import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateCecaPubDto } from './dto/update-ceca-pub.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CecaBeneficiario } from './entities/ceca-beneficiario.entity';
import { CecaBeneficio } from './entities/ceca-beneficio.entity';
import { CecaDomicilioBeneficiario } from './entities/ceca-domicilio.entity';
import { CreateCecaBeneficiarioDto } from './dto/create-ceca-beneficiario.dto';
import { CreateCecaBeneficioDto } from './dto/create-ceca-beneficio.dto';
import { CreateCecaDomicilioDto } from './dto/create-ceca-domicilio.dto';

@Injectable()
export class CecaPubService {
  constructor(
    @InjectRepository(CecaBeneficiario)
    private beneficiarioRepository: Repository<CecaBeneficiario>,
    @InjectRepository(CecaBeneficio)
    private beneficioRepository: Repository<CecaBeneficio>,
    @InjectRepository(CecaDomicilioBeneficiario)
    private domicilioRepository: Repository<CecaDomicilioBeneficiario>,
  ) { }

  async createWithRelation(
    createCecaBeneficiarioDto: CreateCecaBeneficiarioDto,
    createCecaBeneficioDto: CreateCecaBeneficioDto,
    createCecaDomicilioDto: CreateCecaDomicilioDto,
  ): Promise<any> {
    const beneficiario = new CecaBeneficiario();
    Object.assign(beneficiario, createCecaBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new CecaBeneficio();
    Object.assign(beneficio, createCecaBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new CecaDomicilioBeneficiario();
    Object.assign(domicilio, createCecaDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateCecaBeneficiarioDto[],
    beneficiosDto: CreateCecaBeneficioDto[],
    domiciliosDto: CreateCecaDomicilioDto[],
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

      const beneficiario = new CecaBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new CecaBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new CecaDomicilioBeneficiario();
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

  update(id: number, updateCecaPubDto: UpdateCecaPubDto) {
    return `This action updates a #${id} cecaPub`;
  }

  remove(id: number) {
    return `This action removes a #${id} cecaPub`;
  }
}
