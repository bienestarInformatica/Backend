import { Module } from '@nestjs/common';
import { SsypcService } from './ssypc.service';
import { SsypcController } from './ssypc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SsypcBeneficiario } from './entities/ssypc-beneficiario.entity';
import { SsypcBeneficio } from './entities/ssypc-beneficio.entity';
import { SsypcDomicilioBeneficiario } from './entities/ssypc-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SsypcBeneficiario, SsypcBeneficio, SsypcDomicilioBeneficiario])],
  controllers: [SsypcController],
  providers: [SsypcService],
})
export class SsypcModule {}
