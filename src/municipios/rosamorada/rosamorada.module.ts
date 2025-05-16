import { Module } from '@nestjs/common';
import { RosamoradaService } from './rosamorada.service';
import { RosamoradaController } from './rosamorada.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RosamoradaBeneficiario } from './entities/rosamorada-beneficiario.entity';
import { RosamoradaBeneficio } from './entities/rosamorada-beneficio.entity';
import { RosamoradaDomicilioBeneficiario } from './entities/rosamorada-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RosamoradaBeneficiario, RosamoradaBeneficio, RosamoradaDomicilioBeneficiario])],  
  controllers: [RosamoradaController],
  providers: [RosamoradaService],
})
export class RosamoradaModule {}
