import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateCocytenPubDto } from './dto/update-cocyten-pub.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CocytenBeneficiario } from './entities/cocyten-beneficiario.entity';
import { CocytenBeneficio } from './entities/cocyten-beneficio.entity';
import { CocytenDomicilioBeneficiario } from './entities/cocyten-domicilio.entity';
import { CreateCocytenBeneficiarioDto } from './dto/create-cocyten-beneficiario.dto';
import { CreateCocytenBeneficioDto } from './dto/create-cocyten-beneficio.dto';
import { CreateCocytenDomicilioDto } from './dto/create-cocyten-domicilio.dto';

@Injectable()
export class CocytenPubService {
  constructor(
    @InjectRepository(CocytenBeneficiario)
    private beneficiarioRepository: Repository<CocytenBeneficiario>,
    @InjectRepository(CocytenBeneficio)
    private beneficioRepository: Repository<CocytenBeneficio>,
    @InjectRepository(CocytenDomicilioBeneficiario)
    private domicilioRepository: Repository<CocytenDomicilioBeneficiario>
  ) { }

  async createWithRelation(
    createCocytenBeneficiarioDto: CreateCocytenBeneficiarioDto,
    createCocytenBeneficioDto: CreateCocytenBeneficioDto,
    createCocytenDomicilioDto: CreateCocytenDomicilioDto,
  ): Promise<any> {
    const beneficiario = new CocytenBeneficiario();
    Object.assign(beneficiario, createCocytenBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new CocytenBeneficio();
    Object.assign(beneficio, createCocytenBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new CocytenDomicilioBeneficiario();
    Object.assign(domicilio, createCocytenDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateCocytenBeneficiarioDto[],
    beneficiosDto: CreateCocytenBeneficioDto[],
    domiciliosDto: CreateCocytenDomicilioDto[],
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

      const beneficiario = new CocytenBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new CocytenBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new CocytenDomicilioBeneficiario();
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
    return `This action returns a #${id} cocytenPub`;
  }

  update(id: number, updateCocytenPubDto: UpdateCocytenPubDto) {
    return `This action updates a #${id} cocytenPub`;
  }

  remove(id: number) {
    return `This action removes a #${id} cocytenPub`;
  }
}
