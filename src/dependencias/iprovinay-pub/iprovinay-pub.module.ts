import { Module } from '@nestjs/common';
import { IprovinayPubService } from './iprovinay-pub.service';
import { IprovinayPubController } from './iprovinay-pub.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IprovinayBeneficiario } from './entities/iprovinay-beneficiario.entity';
import { IprovinayBeneficio } from './entities/iprovinay-beneficio.entity';
import { IprovinayDomicilioBeneficiario } from './entities/iprovinay-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IprovinayBeneficiario, IprovinayBeneficio, IprovinayDomicilioBeneficiario])],
  controllers: [IprovinayPubController],
  providers: [IprovinayPubService],
})
export class IprovinayPubModule {}
