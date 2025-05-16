import { Module } from '@nestjs/common';
import { TepicService } from './tepic.service';
import { TepicController } from './tepic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TepicBeneficiario } from './entities/tepic-beneficiario.entity';
import { TepicBeneficio } from './entities/tepic-beneficio.entity';
import { TepicDomicilioBeneficiario } from './entities/tepic-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TepicBeneficiario, TepicBeneficio, TepicDomicilioBeneficiario])],
  controllers: [TepicController],
  providers: [TepicService],
})
export class TepicModule {}
