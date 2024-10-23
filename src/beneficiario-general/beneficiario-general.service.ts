import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CecanBeneficiario } from 'src/cecan-pub/entities/cecan-beneficiario.entity';
import { CecanBeneficio } from 'src/cecan-pub/entities/cecan-beneficio.entity';
import { CecanDomicilioBeneficiario } from 'src/cecan-pub/entities/cecan-domicilio.entity';
import { DifBeneficiario } from 'src/dif-pub/entities/dif-beneficiario.entity';
import { DifBeneficio } from 'src/dif-pub/entities/dif-beneficio.entity';
import { DifDomicilioBeneficiario } from 'src/dif-pub/entities/dif-domicilio.entity';
import { InjuveBeneficiario } from 'src/injuve-pub/entities/injuve-beneficiario.entity';
import { InjuveBeneficio } from 'src/injuve-pub/entities/injuve-beneficio.entity';
import { InjuveDomicilioBeneficiario } from 'src/injuve-pub/entities/injuve-domicilio.entity';
import { IprovinayBeneficiario } from 'src/iprovinay-pub/entities/iprovinay-beneficiario.entity';
import { IprovinayBeneficio } from 'src/iprovinay-pub/entities/iprovinay-beneficio.entity';
import { IprovinayDomicilioBeneficiario } from 'src/iprovinay-pub/entities/iprovinay-domicilio.entity';
import { SebienBeneficiario } from 'src/sebien-pub/entities/sebien-beneficiario.entity';
import { SebienBeneficio } from 'src/sebien-pub/entities/sebien-beneficio.entity';
import { SebienDomicilioBeneficiario } from 'src/sebien-pub/entities/sebien-domicilio.entity';
import { StjlBeneficiario } from 'src/stjl-pub/entities/stjl-beneficiario.entity';
import { StjlBeneficio } from 'src/stjl-pub/entities/stjl-beneficio.entity';
import { StjlDomicilioBeneficiario } from 'src/stjl-pub/entities/stjl-domicilio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BeneficiarioGeneralService {
  constructor(
    @InjectRepository(CecanBeneficiario)
    private beneficiarioCecanRepository: Repository<CecanBeneficiario>,
    @InjectRepository(CecanBeneficio)
    private beneficioCecanRepository: Repository<CecanBeneficio>,
    @InjectRepository(CecanDomicilioBeneficiario)
    private domicilioCecanRepository: Repository<CecanDomicilioBeneficiario>,
    @InjectRepository(SebienBeneficiario)
    private beneficiarioSebienRepository: Repository<SebienBeneficiario>,
    @InjectRepository(SebienBeneficio)
    private beneficioSebienRepository: Repository<SebienBeneficio>,
    @InjectRepository(SebienDomicilioBeneficiario)
    private domicilioSebienRepository: Repository<SebienDomicilioBeneficiario>,
    @InjectRepository(DifBeneficiario)
    private beneficiarioDifRepository: Repository<DifBeneficiario>,
    @InjectRepository(DifBeneficio)
    private beneficioDifRepository: Repository<DifBeneficio>,
    @InjectRepository(DifDomicilioBeneficiario)
    private domicilioDifRepository: Repository<DifDomicilioBeneficiario>,
    @InjectRepository(InjuveBeneficiario)
    private beneficiarioInjuveRepository: Repository<InjuveBeneficiario>,
    @InjectRepository(InjuveBeneficio)
    private beneficioInjuveRepository: Repository<InjuveBeneficio>,
    @InjectRepository(InjuveDomicilioBeneficiario)
    private domicilioInjuveRepository: Repository<InjuveDomicilioBeneficiario>,
    @InjectRepository(IprovinayBeneficiario)
    private beneficiarioIprovinayRepository: Repository<IprovinayBeneficiario>,
    @InjectRepository(IprovinayBeneficio)
    private beneficioIprovinayRepository: Repository<IprovinayBeneficio>,
    @InjectRepository(IprovinayDomicilioBeneficiario)
    private domicilioIprovinayRepository: Repository<IprovinayDomicilioBeneficiario>,
    @InjectRepository(StjlBeneficiario)
    private beneficiarioStjlRepository: Repository<StjlBeneficiario>,
    @InjectRepository(StjlBeneficio)
    private beneficioStjlRepository: Repository<StjlBeneficio>,
    @InjectRepository(StjlDomicilioBeneficiario)
    private domicilioStjlRepository: Repository<StjlDomicilioBeneficiario>,
  ) { }

  async obtenerCecan(): Promise<any> {
    try {
      // Obtener beneficiarios de Cecan
      const beneficiariosCecan = await this.beneficiarioCecanRepository.find({
        relations: ['beneficios', 'domicilios'],
      });
  
      // Obtener beneficiarios de Sebien
      const beneficiariosSebien = await this.beneficiarioSebienRepository.find({
        relations: ['beneficios', 'domicilios'],
      });

      const beneficiariosDif = await this.beneficiarioDifRepository.find({
        relations: ['beneficios', 'domicilios'],
      });

      const beneficiariosInjuve = await this.beneficiarioInjuveRepository.find({
        relations: ['beneficios', 'domicilios'],
      });

      const beneficiariosIprovinay = await this.beneficiarioIprovinayRepository.find({
        relations: ['beneficios', 'domicilios'],
      });

      const beneficiariosStjl = await this.beneficiarioStjlRepository.find({
        relations: ['beneficios', 'domicilios'],
      });
  
      // Concatenar ambos arreglos en uno solo
      const todosBeneficiarios = [
        ...beneficiariosCecan, 
        ...beneficiariosSebien, 
        ...beneficiariosDif,
        ...beneficiariosInjuve,
        ...beneficiariosIprovinay,
        ...beneficiariosStjl
      ];
  
      return todosBeneficiarios;
    } catch (error) {
      console.error('Error al obtener beneficiarios:', error);
      throw error; // Puedes manejar el error según tu aplicación
    }
  }  

  async obtenerBeneficiarios() {
    const query = `
      SELECT *
      FROM beneficiario_cecan b
      INNER JOIN beneficio_cecan bc ON b.id_beneficiario = bc.id_beneficiario
      INNER JOIN identificacion_domicilio_geografico_cecan idg ON b.id_beneficiario = idg.id_beneficiario

      UNION ALL

      SELECT *
      FROM beneficiario_sebien bs
      INNER JOIN beneficio_sebien bse ON bs.id_beneficiario = bse.id_beneficiario
      INNER JOIN identificacion_domicilio_geografico_sebien idgs ON bs.id_beneficiario = idgs.id_beneficiario

      
    `;

    try {
      const results = await this.beneficiarioCecanRepository.query(query);
      return results;
    } catch (error) {
      throw new Error(`Error al ejecutar la consulta SQL: ${error.message}`);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} beneficiarioGeneral`;
  }

}
