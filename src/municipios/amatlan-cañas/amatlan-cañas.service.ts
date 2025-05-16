import { Injectable } from '@nestjs/common';
import { UpdateAmatlanCañaDto } from './dto/update-amatlan-caña.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AmatlanBeneficiario } from './entities/amatlan-cañas-beneficiario.entity';
import { AmatlanBeneficio } from './entities/amatlan-cañas-beneficio.entity';
import { AmatlanDomicilioBeneficiario } from './entities/amatlan-cañas-domicilio.entity';
import { Repository } from 'typeorm';
import { CreateAmatlanBeneficiarioDto } from './dto/create-amatlan-cañas-beneficiario.dto';
import { CreateAmatlanBeneficioDto } from './dto/create-amatlan-cañas-beneficio.dto';
import { CreateAmatlanDomicilioDto } from './dto/create-amatlan-cañas-domicilio.dto';

@Injectable()
export class AmatlanCañasService {
  constructor(
    @InjectRepository(AmatlanBeneficiario)
    private beneficiarioRepository: Repository<AmatlanBeneficiario>,
    @InjectRepository(AmatlanBeneficio)
    private beneficioRepository: Repository<AmatlanBeneficio>,
    @InjectRepository(AmatlanDomicilioBeneficiario)
    private domicilioRepository: Repository<AmatlanDomicilioBeneficiario>,
  ) {}

   async createWithRelation(
      createAmatlanBeneficiarioDto: CreateAmatlanBeneficiarioDto,
      createAmatlanBeneficioDto: CreateAmatlanBeneficioDto,
      createAmatlanDomicilioDto: CreateAmatlanDomicilioDto,
    ): Promise<any> {
      const beneficiario = new AmatlanBeneficiario();
      Object.assign(beneficiario, createAmatlanBeneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);
  
      const beneficio = new AmatlanBeneficio();
      Object.assign(beneficio, createAmatlanBeneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);
  
      const domicilio = new AmatlanDomicilioBeneficiario();
      Object.assign(domicilio, createAmatlanDomicilioDto);
      domicilio.beneficiario = savedBeneficiario;
      const savedDomicilio = await this.domicilioRepository.save(domicilio);
  
      return {
        beneficiario: savedBeneficiario,
        beneficio: savedBeneficio,
        domicilio: savedDomicilio,
      };
    }

  create(createAmatlanCañaDto: CreateAmatlanBeneficiarioDto) {
    return 'This action adds a new amatlanCaña';
  }

  findAll() {
    return `This action returns all amatlanCañas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} amatlanCaña`;
  }

  update(id: number, updateAmatlanCañaDto: UpdateAmatlanCañaDto) {
    return `This action updates a #${id} amatlanCaña`;
  }

  remove(id: number) {
    return `This action removes a #${id} amatlanCaña`;
  }
}
