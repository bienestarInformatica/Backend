import { Module } from '@nestjs/common';
import { CompostelaService } from './compostela.service';
import { CompostelaController } from './compostela.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompostelaBeneficiario } from './entities/compostela-beneficiario.entity';
import { CompostelaBeneficio } from './entities/compostela-beneficio.entity';
import { CompostelaDomicilioBeneficiario } from './entities/compostela-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompostelaBeneficiario, CompostelaBeneficio, CompostelaDomicilioBeneficiario])], 
  controllers: [CompostelaController],
  providers: [CompostelaService],
})
export class CompostelaModule {}
