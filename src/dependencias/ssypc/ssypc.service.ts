import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateSsypcDto } from './dto/update-ssypc.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SsypcBeneficiario } from './entities/ssypc-beneficiario.entity';
import { SsypcBeneficio } from './entities/ssypc-beneficio.entity';
import { SsypcDomicilioBeneficiario } from './entities/ssypc-domicilio.entity';
import { CreateSsypcBeneficiarioDto } from './dto/create-ssypc-beneficiario.dto';
import { CreateSsypcBeneficioDto } from './dto/create-ssypc-beneficio.dto';
import { CreateSsypcDomicilioDto } from './dto/create-ssypc-domicilio.dto';

@Injectable()
export class SsypcService {

  constructor(
    @InjectRepository(SsypcBeneficiario)
    private beneficiarioRepository: Repository<SsypcBeneficiario>,
    @InjectRepository(SsypcBeneficio)
    private beneficioRepository: Repository<SsypcBeneficio>,
    @InjectRepository(SsypcDomicilioBeneficiario)
    private domicilioRepository: Repository<SsypcDomicilioBeneficiario>
  ) { }
  
  async createWithRelation(
    createSsypcBeneficiarioDto: CreateSsypcBeneficiarioDto,
    createSsypcBeneficioDto: CreateSsypcBeneficioDto,
    createSsypcDomicilioDto: CreateSsypcDomicilioDto,
  ): Promise<any> {
    const beneficiario = new SsypcBeneficiario();
    Object.assign(beneficiario, createSsypcBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new SsypcBeneficio();
    Object.assign(beneficio, createSsypcBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new SsypcDomicilioBeneficiario();
    Object.assign(domicilio, createSsypcDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateSsypcBeneficiarioDto[],
    beneficiosDto: CreateSsypcBeneficioDto[],
    domiciliosDto: CreateSsypcDomicilioDto[],
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

      const beneficiario = new SsypcBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new SsypcBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new SsypcDomicilioBeneficiario();
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
    return `This action returns all ssypc`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ssypc`;
  }

  update(id: number, updateSsypcDto: UpdateSsypcDto) {
    return `This action updates a #${id} ssypc`;
  }

  remove(id: number) {
    return `This action removes a #${id} ssypc`;
  }
}
