import { Module } from '@nestjs/common';
import { NayarService } from './nayar.service';
import { NayarController } from './nayar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NayarBeneficiario } from './entities/nayar-beneficiario.entity';
import { NayarBeneficio } from './entities/nayar-beneficio.entity';
import { NayarDomicilioBeneficiario } from './entities/nayar-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NayarBeneficiario, NayarBeneficio, NayarDomicilioBeneficiario])],
  controllers: [NayarController],
  providers: [NayarService],
})
export class NayarModule {}
