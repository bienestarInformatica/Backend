import { Module } from '@nestjs/common';
import { BeneficiarioGeneralService } from './beneficiario-general.service';
import { BeneficiarioGeneralController } from './beneficiario-general.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SebienBeneficiario } from 'src/dependencias/sebien-pub/entities/sebien-beneficiario.entity';
import { CecanBeneficiario } from 'src/dependencias/cecan-pub/entities/cecan-beneficiario.entity';
import { CecanBeneficio } from 'src/dependencias/cecan-pub/entities/cecan-beneficio.entity';
import { CecanDomicilioBeneficiario } from 'src/dependencias/cecan-pub/entities/cecan-domicilio.entity';
import { SebienBeneficio } from 'src/dependencias/sebien-pub/entities/sebien-beneficio.entity';
import { SebienDomicilioBeneficiario } from 'src/dependencias/sebien-pub/entities/sebien-domicilio.entity';
import { DifBeneficiario } from 'src/dependencias/dif-pub/entities/dif-beneficiario.entity';
import { DifBeneficio } from 'src/dependencias/dif-pub/entities/dif-beneficio.entity';
import { DifDomicilioBeneficiario } from 'src/dependencias/dif-pub/entities/dif-domicilio.entity';
import { InjuveBeneficiario } from 'src/dependencias/injuve-pub/entities/injuve-beneficiario.entity';
import { InjuveBeneficio } from 'src/dependencias/injuve-pub/entities/injuve-beneficio.entity';
import { InjuveDomicilioBeneficiario } from 'src/dependencias/injuve-pub/entities/injuve-domicilio.entity';
import { IprovinayBeneficiario } from 'src/dependencias/iprovinay-pub/entities/iprovinay-beneficiario.entity';
import { IprovinayBeneficio } from 'src/dependencias/iprovinay-pub/entities/iprovinay-beneficio.entity';
import { IprovinayDomicilioBeneficiario } from 'src/dependencias/iprovinay-pub/entities/iprovinay-domicilio.entity';
import { StjlBeneficiario } from 'src/dependencias/stjl-pub/entities/stjl-beneficiario.entity';
import { StjlBeneficio } from 'src/dependencias/stjl-pub/entities/stjl-beneficio.entity';
import { StjlDomicilioBeneficiario } from 'src/dependencias/stjl-pub/entities/stjl-domicilio.entity';
import { JalaBeneficiario } from 'src/municipios/jala/entities/jala-beneficiario.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [
      CecanBeneficiario,
      CecanBeneficio,
      CecanDomicilioBeneficiario,
      SebienBeneficiario,
      SebienBeneficio,
      SebienDomicilioBeneficiario,
      DifBeneficiario,
      DifBeneficio,
      DifDomicilioBeneficiario,
      InjuveBeneficiario,
      InjuveBeneficio,
      InjuveDomicilioBeneficiario,
      IprovinayBeneficiario,
      IprovinayBeneficio,
      IprovinayDomicilioBeneficiario,
      StjlBeneficiario,
      StjlBeneficio,
      StjlDomicilioBeneficiario,
      JalaBeneficiario,
    ])],
  controllers: [BeneficiarioGeneralController],
  providers: [BeneficiarioGeneralService],
})
export class BeneficiarioGeneralModule {}
