import { Module } from '@nestjs/common';
import { IxtlanService } from './ixtlan.service';
import { IxtlanController } from './ixtlan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IxtlanBeneficiario } from './entities/ixtlan-beneficiario.entity';
import { IxtlanBeneficio } from './entities/ixtlan-beneficio.entity';
import { IxtlanDomicilioBeneficiario } from './entities/ixtlan-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IxtlanBeneficiario, IxtlanBeneficio, IxtlanDomicilioBeneficiario])],
  controllers: [IxtlanController],
  providers: [IxtlanService],
})
export class IxtlanModule {}
