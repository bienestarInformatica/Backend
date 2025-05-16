import { Module } from '@nestjs/common';
import { InjuvePubService } from './injuve-pub.service';
import { InjuvePubController } from './injuve-pub.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InjuveBeneficiario } from './entities/injuve-beneficiario.entity';
import { InjuveBeneficio } from './entities/injuve-beneficio.entity';
import { InjuveDomicilioBeneficiario } from './entities/injuve-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InjuveBeneficiario, InjuveBeneficio, InjuveDomicilioBeneficiario])],
  controllers: [InjuvePubController],
  providers: [InjuvePubService],
})
export class InjuvePubModule {}
