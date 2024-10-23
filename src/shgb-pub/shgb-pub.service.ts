import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateShgbPubDto } from './dto/update-shgb-pub.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShgbBeneficiario } from './entities/shgb-beneficiarios.entity';
import { ShgbBeneficio } from './entities/shgb-beneficio.entity';
import { ShgbDomicilioBeneficiario } from './entities/shgb-domicilio.entity';
import { CreateShgbBeneficiarioDto } from './dto/create-shgb-beneficiario.dto';
import { CreateShgbBeneficioDto } from './dto/create-shgb-beneficio.dto';
import { CreateShgbDomicilioDto } from './dto/create-shgb-domicilio.dto';

@Injectable()
export class ShgbPubService {
  constructor(
    @InjectRepository(ShgbBeneficiario)
    private beneficiarioRepository: Repository<ShgbBeneficiario>,
    @InjectRepository(ShgbBeneficio)
    private beneficioRepository: Repository<ShgbBeneficio>,
    @InjectRepository(ShgbDomicilioBeneficiario)
    private domicilioRepository: Repository<ShgbDomicilioBeneficiario>
  ) { }

  async createWithRelation(
    createShgbBeneficiarioDto: CreateShgbBeneficiarioDto,
    createShgbBeneficioDto: CreateShgbBeneficioDto,
    createShgbDomicilioDto: CreateShgbDomicilioDto,
  ): Promise<any> {
    const beneficiario = new ShgbBeneficiario();
    Object.assign(beneficiario, createShgbBeneficiarioDto);
    const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

    const beneficio = new ShgbBeneficio();
    Object.assign(beneficio, createShgbBeneficioDto);
    beneficio.beneficiario = savedBeneficiario;
    const savedBeneficio = await this.beneficioRepository.save(beneficio);

    const domicilio = new ShgbDomicilioBeneficiario();
    Object.assign(domicilio, createShgbDomicilioDto);
    domicilio.beneficiario = savedBeneficiario;
    const savedDomicilio = await this.domicilioRepository.save(domicilio);

    return {
      beneficiario: savedBeneficiario,
      beneficio: savedBeneficio,
      domicilio: savedDomicilio,
    };
  }

  async createMultipleWithRelation(
    beneficiariosDto: CreateShgbBeneficiarioDto[],
    beneficiosDto: CreateShgbBeneficioDto[],
    domiciliosDto: CreateShgbDomicilioDto[],
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

      const beneficiario = new ShgbBeneficiario();
      Object.assign(beneficiario, beneficiarioDto);
      const savedBeneficiario = await this.beneficiarioRepository.save(beneficiario);

      const beneficio = new ShgbBeneficio();
      Object.assign(beneficio, beneficioDto);
      beneficio.beneficiario = savedBeneficiario;
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const domicilio = new ShgbDomicilioBeneficiario();
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

  update(id: number, updateShgbPubDto: UpdateShgbPubDto) {
    return `This action updates a #${id} shgbPub`;
  }

  remove(id: number) {
    return `This action removes a #${id} shgbPub`;
  }
}
