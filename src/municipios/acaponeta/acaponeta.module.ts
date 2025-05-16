import { Module } from '@nestjs/common';
import { AcaponetaService } from './acaponeta.service';
import { AcaponetaController } from './acaponeta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcaponetaBeneficiario } from './entities/acaponeta-beneficiario.entity';
import { AcaponetaBeneficio } from './entities/acaponeta-beneficio.entity';
import { AcaponetaDomicilioBeneficiario } from './entities/acaponeta-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AcaponetaBeneficiario, AcaponetaBeneficio, AcaponetaDomicilioBeneficiario])],
  controllers: [AcaponetaController],
  providers: [AcaponetaService],
})
export class AcaponetaModule {}
