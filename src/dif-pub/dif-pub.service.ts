import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateDifPubDto } from './dto/update-dif-pub.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DifBeneficiario } from './entities/dif-beneficiario.entity';
import { DifBeneficio } from './entities/dif-beneficio.entity';
import { DifDomicilioBeneficiario } from './entities/dif-domicilio.entity';
import { CreateDifBeneficiarioDto } from './dto/create-dif-beneficiario.dto';
import { CreateDifBeneficioDto } from './dto/create-dif-beneficio.dto';
import { CreateDifDomicilioDto } from './dto/create-dif-domicilio.dto';

@Injectable()
export class DifPubService {
  constructor(
    @InjectRepository(DifBeneficiario)
    private beneficiarioRepository: Repository<DifBeneficiario>,
    @InjectRepository(DifBeneficio)
    private beneficioRepository: Repository<DifBeneficio>,
    @InjectRepository(DifDomicilioBeneficiario)
    private domicilioRepository: Repository<DifDomicilioBeneficiario>,
  ){}
  
  async createWithRelation(
    createDifBeneficiarioDto: CreateDifBeneficiarioDto,
    createDifBeneficioDto: CreateDifBeneficioDto,
    createDifDomicilioDto: CreateDifDomicilioDto,
  ): Promise<any> {
    const beneficiario = new DifBeneficiario();
    Object.assign(beneficiario, createDifBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new DifBeneficio();
    Object.assign(beneficio, createDifBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new DifDomicilioBeneficiario();
    Object.assign(domicilio, createDifDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateDifBeneficiarioDto[],
    beneficiosDto: CreateDifBeneficioDto[],
    domiciliosDto: CreateDifDomicilioDto[],
  ): Promise<any[]> {
    const resultados = [];
  
    for (let i = 0; i < beneficiariosDto.length; i++) {
      const beneficiarioDto = beneficiariosDto[i];
      const beneficioDto = beneficiosDto[i];
      const domicilioDto = domiciliosDto[i];
  
      console.log(`Processing CURP: ${beneficiarioDto.curp}`);
  
      const existingBeneficiario = await this.beneficiarioRepository.findOne({
        where: { curp: beneficiarioDto.curp },
      });
  
      if (existingBeneficiario) {
        console.log(`Beneficiario with CURP ${beneficiarioDto.curp} already exists.`);
        throw new ConflictException(`Ya existe un beneficiario con la CURP: ${beneficiarioDto.curp}`);
      }
  
      try {
        const beneficiario = new DifBeneficiario();
        Object.assign(beneficiario, beneficiarioDto);
        const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);
        console.log(`Saved beneficiario: ${savedBeneficiario}`);
  
        const beneficio = new DifBeneficio();
        Object.assign(beneficio, beneficioDto);
        beneficio.beneficiario = savedBeneficiario;
        const savedBeneficio = await this.beneficioRepository.save(beneficio);
        console.log(`Saved beneficio: ${savedBeneficio}`);
  
        const domicilio = new DifDomicilioBeneficiario();
        Object.assign(domicilio, domicilioDto);
        domicilio.beneficiario = savedBeneficiario;
        const savedDomicilio = await this.domicilioRepository.save(domicilio);
        console.log(`Saved domicilio: ${savedDomicilio}`);
  
        resultados.push({
          beneficiario: savedBeneficiario,
          beneficio: savedBeneficio,
          domicilio: savedDomicilio,
        });
      } catch (error) {
        console.error(`Error saving data for CURP ${beneficiarioDto.curp}:`, error);
        throw error;
      }
    }
  
    return resultados;
  }

  // async createMultipleWithRelation(
  //   beneficiariosDto: CreateDifBeneficiarioDto[],
  //   beneficiosDto: CreateDifBeneficioDto[],
  //   domiciliosDto: CreateDifDomicilioDto[],
  // ): Promise<any[]> {
  //   const resultados = [];

  //   for (let i = 0; i < beneficiariosDto.length; i++) {
  //     const beneficiarioDto = beneficiariosDto[i];
  //     const beneficioDto = beneficiosDto[i];
  //     const domicilioDto = domiciliosDto[i];

  //     const existingBeneficiario = await this.beneficiarioRepository.findOne({ where: { curp: beneficiarioDto.curp } });
  //   if (existingBeneficiario) {
  //     throw new ConflictException(`Ya existe un beneficiario con la CURP: ${beneficiarioDto.curp}`);
  //   }

  //     const beneficiario = new DifBeneficiario();
  //     Object.assign(beneficiario, beneficiarioDto);
  //     const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

  //     const beneficio = new DifBeneficio();
  //     Object.assign(beneficio, beneficioDto);
  //     beneficio.beneficiario = savedBeneficiario;
  //     const savedBeneficio = await this.beneficioRepository.save(beneficio);

  //     const domicilio = new DifDomicilioBeneficiario();
  //     Object.assign(domicilio, domicilioDto);
  //     domicilio.beneficiario = savedBeneficiario;
  //     const savedDomicilio = await this.domicilioRepository.save(domicilio);

  //     resultados.push({
  //       beneficiario: savedBeneficiario,
  //       beneficio: savedBeneficio,
  //       domicilio: savedDomicilio,
  //     });
  //   }

  //   return resultados;
  // }

  async findAllWithRelations(): Promise<any> {
    const beneficiarios = await this.beneficiarioRepository.find({
      relations: ['beneficios', 'domicilios'],
    });

    return beneficiarios;
  }

  async findByCurpWithRelations(curp: string): Promise<DifBeneficiario | undefined> {
    return await this.beneficiarioRepository
      .createQueryBuilder('b')
      .leftJoinAndSelect('b.beneficios', 'bs')
      .leftJoinAndSelect('b.domicilios', 'idg')
      .where('b.curp = :curp', { curp })
      .getOne();
  }

  findOne(id: number) {
    return `This action returns a #${id} difPub`;
  }

  update(id: number, updateDifPubDto: UpdateDifPubDto) {
    return `This action updates a #${id} difPub`;
  }

  remove(id: number) {
    return `This action removes a #${id} difPub`;
  }
}
