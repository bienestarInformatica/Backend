import { Module } from '@nestjs/common';
import { HuajicoriService } from './huajicori.service';
import { HuajicoriController } from './huajicori.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HuajicoriBeneficiario } from './entities/huajicori-beneficiario.entity';
import { HuajicoriBeneficio } from './entities/huajicori-beneficio.entity';
import { HuajicoriDomicilioBeneficiario } from './entities/huajicori-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HuajicoriBeneficiario, HuajicoriBeneficio, HuajicoriDomicilioBeneficiario])],
  controllers: [HuajicoriController],
  providers: [HuajicoriService],
})

export class HuajicoriModule {}
