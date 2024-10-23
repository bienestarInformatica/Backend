import { Module } from '@nestjs/common';
import { IcatenPubService } from './icaten-pub.service';
import { IcatenPubController } from './icaten-pub.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IcatenBeneficiario } from './entities/icaten-beneficiario.entity';
import { IcatenBeneficio } from './entities/icaten-beneficio.entity';
import { IcatenDomicilioBeneficiario } from './entities/icaten-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IcatenBeneficiario, IcatenBeneficio, IcatenDomicilioBeneficiario])],
  controllers: [IcatenPubController],
  providers: [IcatenPubService],
})
export class IcatenPubModule {}
