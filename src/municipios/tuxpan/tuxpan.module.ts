import { Module } from '@nestjs/common';
import { TuxpanService } from './tuxpan.service';
import { TuxpanController } from './tuxpan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TuxpanBeneficiario } from './entities/tuxpan-beneficiario.entity';
import { TuxpanBeneficio } from './entities/tuxpan-beneficio.entity';
import { TuxpanDomicilioBeneficiario } from './entities/tuxpan-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TuxpanBeneficiario, TuxpanBeneficio, TuxpanDomicilioBeneficiario])],
  controllers: [TuxpanController],
  providers: [TuxpanService],
})
export class TuxpanModule {}
