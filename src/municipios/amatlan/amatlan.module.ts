import { Module } from '@nestjs/common';
import { AmatlanService } from './amatlan.service';
import { AmatlanController } from './amatlan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmatlanBeneficiario } from './entities/amatlan-beneficiario.entity';
import { AmatlanBeneficio } from './entities/amatlan-beneficio.entity';
import { AmatlanDomicilioBeneficiario } from './entities/amatlan-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AmatlanBeneficiario, AmatlanBeneficio, AmatlanDomicilioBeneficiario])], // Add your entities here
  controllers: [AmatlanController],
  providers: [AmatlanService],
})
export class AmatlanModule {}
