import { Module } from '@nestjs/common';
import { AhuacatlanService } from './ahuacatlan.service';
import { AhuacatlanController } from './ahuacatlan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AhuacatlanBeneficiario } from './entities/ahuacatlan-beneficiario.entity';
import { AhuacatlanBeneficio } from './entities/ahuacatlan-beneficio.entity';
import { AhuacatlanDomicilioBeneficiario } from './entities/ahuacatlan-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AhuacatlanBeneficiario, AhuacatlanBeneficio, AhuacatlanDomicilioBeneficiario])],
  controllers: [AhuacatlanController],
  providers: [AhuacatlanService],
})
export class AhuacatlanModule {}
