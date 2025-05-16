import { Module } from '@nestjs/common';
import { StjlPubService } from './stjl-pub.service';
import { StjlPubController } from './stjl-pub.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StjlBeneficiario } from './entities/stjl-beneficiario.entity';
import { StjlBeneficio } from './entities/stjl-beneficio.entity';
import { StjlDomicilioBeneficiario } from './entities/stjl-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StjlBeneficiario, StjlBeneficio, StjlDomicilioBeneficiario])],
  controllers: [StjlPubController],
  providers: [StjlPubService],
})
export class StjlPubModule {}
