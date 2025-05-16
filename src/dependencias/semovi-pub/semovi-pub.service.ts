import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateSemoviPubDto } from './dto/update-semovi-pub.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SemoviBeneficiario } from './entities/semovi-beneficiario.entity';
import { SemoviBeneficio } from './entities/semovi-beneficio.entity';
import { SemoviDomicilioBeneficiario } from './entities/semovi-domicilio.entity';
import { CreateSemoviBeneficiarioDto } from './dto/create-semovi-beneficiario.dto';
import { CreateSemoviBeneficioDto } from './dto/create-semovi-beneficio.dto';
import { CreateSemoviDomicilioDto } from './dto/create-semovi-domicilio.dto';

@Injectable()
export class SemoviPubService {
  constructor(
    @InjectRepository(SemoviBeneficiario)
    private beneficiarioRepository: Repository<SemoviBeneficiario>,
    @InjectRepository(SemoviBeneficio)
    private beneficioRepository: Repository<SemoviBeneficio>,
    @InjectRepository(SemoviDomicilioBeneficiario)
    private domicilioRepository: Repository<SemoviDomicilioBeneficiario>
  ) { }

  async createWithRelation(
    createSemoviBeneficiarioDto: CreateSemoviBeneficiarioDto,
    createSemoviBeneficioDto: CreateSemoviBeneficioDto,
    createSemoviDomicilioDto: CreateSemoviDomicilioDto,
  ): Promise<any> {
    const beneficiario = new SemoviBeneficiario();
    Object.assign(beneficiario, createSemoviBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new SemoviBeneficio();
    Object.assign(beneficio, createSemoviBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new SemoviDomicilioBeneficiario();
    Object.assign(domicilio, createSemoviDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateSemoviBeneficiarioDto[],
    beneficiosDto: CreateSemoviBeneficioDto[],
    domiciliosDto: CreateSemoviDomicilioDto[],
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

      const beneficiario = new SemoviBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new SemoviBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new SemoviDomicilioBeneficiario();
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
    return `This action returns a #${id} semoviPub`;
  }

  update(id: number, updateSemoviPubDto: UpdateSemoviPubDto) {
    return `This action updates a #${id} semoviPub`;
  }

  remove(id: number) {
    return `This action removes a #${id} semoviPub`;
  }
}
