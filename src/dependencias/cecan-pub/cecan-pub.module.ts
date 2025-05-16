import { Module } from '@nestjs/common';
import { CecanPubService } from './cecan-pub.service';
import { CecanPubController } from './cecan-pub.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CecanBeneficiario } from './entities/cecan-beneficiario.entity';
import { CecanBeneficio } from './entities/cecan-beneficio.entity';
import { CecanDomicilioBeneficiario } from './entities/cecan-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CecanBeneficiario, CecanBeneficio, CecanDomicilioBeneficiario])],
  controllers: [CecanPubController],
  providers: [CecanPubService],
})
export class CecanPubModule {}
