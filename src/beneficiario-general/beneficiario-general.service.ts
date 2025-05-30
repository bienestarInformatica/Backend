import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CecanBeneficiario } from 'src/dependencias/cecan-pub/entities/cecan-beneficiario.entity';
import { DifBeneficiario } from 'src/dependencias/dif-pub/entities/dif-beneficiario.entity';
import { InjuveBeneficiario } from 'src/dependencias/injuve-pub/entities/injuve-beneficiario.entity';
import { IprovinayBeneficiario } from 'src/dependencias/iprovinay-pub/entities/iprovinay-beneficiario.entity';
import { SebienBeneficiario } from 'src/dependencias/sebien-pub/entities/sebien-beneficiario.entity';
import { StjlBeneficiario } from 'src/dependencias/stjl-pub/entities/stjl-beneficiario.entity';
import { JalaBeneficiario } from 'src/municipios/jala/entities/jala-beneficiario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BeneficiarioGeneralService {
  constructor(
    @InjectRepository(CecanBeneficiario)
    private beneficiarioCecanRepository: Repository<CecanBeneficiario>,
    @InjectRepository(SebienBeneficiario)
    private beneficiarioSebienRepository: Repository<SebienBeneficiario>,
    @InjectRepository(DifBeneficiario)
    private beneficiarioDifRepository: Repository<DifBeneficiario>,
    @InjectRepository(InjuveBeneficiario)
    private beneficiarioInjuveRepository: Repository<InjuveBeneficiario>,
    @InjectRepository(IprovinayBeneficiario)
    private beneficiarioIprovinayRepository: Repository<IprovinayBeneficiario>,
    @InjectRepository(StjlBeneficiario)
    private beneficiarioStjlRepository: Repository<StjlBeneficiario>,
    @InjectRepository(JalaBeneficiario)
    private beneficiarioJalaRepository: Repository<JalaBeneficiario>,
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

      const beneficiariosJala = await this.beneficiarioJalaRepository.find({
        relations: ['beneficios', 'domicilios'],
      });
  
      // Concatenar ambos arreglos en uno solo
      const todosBeneficiarios = [
        ...beneficiariosCecan, 
        ...beneficiariosSebien, 
        ...beneficiariosDif,
        ...beneficiariosInjuve,
        ...beneficiariosIprovinay,
        ...beneficiariosStjl,
        ...beneficiariosJala,
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
