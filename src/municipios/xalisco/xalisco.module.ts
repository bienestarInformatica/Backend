import { Module } from '@nestjs/common';
import { XaliscoService } from './xalisco.service';
import { XaliscoController } from './xalisco.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XaliscoBeneficiario } from './entities/xalisco-beneficiario.entity';
import { XaliscoBeneficio } from './entities/xalisco-beneficio.entity';
import { XaliscoDomicilioBeneficiario } from './entities/xalisco-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([XaliscoBeneficiario, XaliscoBeneficio, XaliscoDomicilioBeneficiario])],
  controllers: [XaliscoController],
  providers: [XaliscoService],
})
export class XaliscoModule {}
