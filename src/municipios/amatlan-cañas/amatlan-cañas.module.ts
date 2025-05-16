import { Module } from '@nestjs/common';
import { AmatlanCañasService } from './amatlan-cañas.service';
import { AmatlanCañasController } from './amatlan-cañas.controller';
import { AmatlanBeneficiario } from './entities/amatlan-cañas-beneficiario.entity';
import { AmatlanBeneficio } from './entities/amatlan-cañas-beneficio.entity';
import { AmatlanDomicilioBeneficiario } from './entities/amatlan-cañas-domicilio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AmatlanBeneficiario, AmatlanBeneficio, AmatlanDomicilioBeneficiario])],
  controllers: [AmatlanCañasController],
  providers: [AmatlanCañasService],
})
export class AmatlanCañasModule {}
