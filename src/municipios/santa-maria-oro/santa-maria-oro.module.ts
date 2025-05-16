import { Module } from '@nestjs/common';
import { SantaMariaOroService } from './santa-maria-oro.service';
import { SantaMariaOroController } from './santa-maria-oro.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SantaMariaOroBeneficiario } from './entities/santa-maria-oro-beneficiario.entity';
import { SantaMariaOroBeneficio } from './entities/santa-maria-oro-beneficio.entity';
import { SantaMariaOroDomicilioBeneficiario } from './entities/santa-maria-oro-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SantaMariaOroBeneficiario, SantaMariaOroBeneficio, SantaMariaOroDomicilioBeneficiario])],
  controllers: [SantaMariaOroController],
  providers: [SantaMariaOroService],
})
export class SantaMariaOroModule {}
