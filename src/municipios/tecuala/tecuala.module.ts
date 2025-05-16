import { Module } from '@nestjs/common';
import { TecualaService } from './tecuala.service';
import { TecualaController } from './tecuala.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TecualaBeneficiario } from './entities/tecuala-beneficiario.entity';
import { TecualaBeneficio } from './entities/tecuala-beneficio.entity';
import { TecualaDomicilioBeneficiario } from './entities/tecuala-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TecualaBeneficiario, TecualaBeneficio, TecualaDomicilioBeneficiario])],
  controllers: [TecualaController],
  providers: [TecualaService],
})
export class TecualaModule {}
