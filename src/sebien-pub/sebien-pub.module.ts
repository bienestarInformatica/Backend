import { Module } from '@nestjs/common';
import { SebienPubService } from './sebien-pub.service';
import { SebienPubController } from './sebien-pub.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SebienBeneficiario } from './entities/sebien-beneficiario.entity';
import { SebienBeneficio } from './entities/sebien-beneficio.entity';
import { SebienDomicilioBeneficiario } from './entities/sebien-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SebienBeneficiario, SebienBeneficio, SebienDomicilioBeneficiario])],
  controllers: [SebienPubController],
  providers: [SebienPubService],
})
export class SebienPubModule {}
