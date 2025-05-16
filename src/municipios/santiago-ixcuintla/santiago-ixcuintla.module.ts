import { Module } from '@nestjs/common';
import { SantiagoIxcuintlaService } from './santiago-ixcuintla.service';
import { SantiagoIxcuintlaController } from './santiago-ixcuintla.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SantiagoIxcuintlaBeneficiario } from './entities/santiago-ixcuintla-beneficiario.entity';
import { SantiagoIxcuintlaBeneficio } from './entities/santiago-ixcuintla-beneficio.entity';
import { SantiagoIxcuintlaDomicilioBeneficiario } from './entities/santiago-ixcuintla-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SantiagoIxcuintlaBeneficiario, SantiagoIxcuintlaBeneficio, SantiagoIxcuintlaDomicilioBeneficiario])],
  controllers: [SantiagoIxcuintlaController],
  providers: [SantiagoIxcuintlaService],
})
export class SantiagoIxcuintlaModule {}
