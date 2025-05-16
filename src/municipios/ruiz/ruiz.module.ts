import { Module } from '@nestjs/common';
import { RuizService } from './ruiz.service';
import { RuizController } from './ruiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuizBeneficiario } from './entities/ruiz-beneficiario.entity';
import { RuizBeneficio } from './entities/ruiz-beneficio.entity';
import { RuizDomicilioBeneficiario } from './entities/ruiz-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RuizBeneficiario, RuizBeneficio, RuizDomicilioBeneficiario])],
  controllers: [RuizController],
  providers: [RuizService],
})
export class RuizModule {}
