import { Module } from '@nestjs/common';
import { DifPubService } from './dif-pub.service';
import { DifPubController } from './dif-pub.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DifBeneficiario } from './entities/dif-beneficiario.entity';
import { DifBeneficio } from './entities/dif-beneficio.entity';
import { DifDomicilioBeneficiario } from './entities/dif-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DifBeneficiario, DifBeneficio, DifDomicilioBeneficiario])],
  controllers: [DifPubController],
  providers: [DifPubService],
})
export class DifPubModule {}
