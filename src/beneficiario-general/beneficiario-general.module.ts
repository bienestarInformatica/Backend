import { Module } from '@nestjs/common';
import { BeneficiarioGeneralService } from './beneficiario-general.service';
import { BeneficiarioGeneralController } from './beneficiario-general.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SebienBeneficiario } from 'src/sebien-pub/entities/sebien-beneficiario.entity';
import { CecanBeneficiario } from 'src/cecan-pub/entities/cecan-beneficiario.entity';
import { CecanBeneficio } from 'src/cecan-pub/entities/cecan-beneficio.entity';
import { CecanDomicilioBeneficiario } from 'src/cecan-pub/entities/cecan-domicilio.entity';
import { SebienBeneficio } from 'src/sebien-pub/entities/sebien-beneficio.entity';
import { SebienDomicilioBeneficiario } from 'src/sebien-pub/entities/sebien-domicilio.entity';
import { DifBeneficiario } from 'src/dif-pub/entities/dif-beneficiario.entity';
import { DifBeneficio } from 'src/dif-pub/entities/dif-beneficio.entity';
import { DifDomicilioBeneficiario } from 'src/dif-pub/entities/dif-domicilio.entity';
import { InjuveBeneficiario } from 'src/injuve-pub/entities/injuve-beneficiario.entity';
import { InjuveBeneficio } from 'src/injuve-pub/entities/injuve-beneficio.entity';
import { InjuveDomicilioBeneficiario } from 'src/injuve-pub/entities/injuve-domicilio.entity';
import { IprovinayBeneficiario } from 'src/iprovinay-pub/entities/iprovinay-beneficiario.entity';
import { IprovinayBeneficio } from 'src/iprovinay-pub/entities/iprovinay-beneficio.entity';
import { IprovinayDomicilioBeneficiario } from 'src/iprovinay-pub/entities/iprovinay-domicilio.entity';
import { StjlBeneficiario } from 'src/stjl-pub/entities/stjl-beneficiario.entity';
import { StjlBeneficio } from 'src/stjl-pub/entities/stjl-beneficio.entity';
import { StjlDomicilioBeneficiario } from 'src/stjl-pub/entities/stjl-domicilio.entity';

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
    ])],
  controllers: [BeneficiarioGeneralController],
  providers: [BeneficiarioGeneralService],
})
export class BeneficiarioGeneralModule {}
