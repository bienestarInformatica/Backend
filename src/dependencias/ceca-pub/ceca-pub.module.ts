import { Module } from '@nestjs/common';
import { CecaPubService } from './ceca-pub.service';
import { CecaPubController } from './ceca-pub.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CecaBeneficiario } from './entities/ceca-beneficiario.entity';
import { CecaBeneficio } from './entities/ceca-beneficio.entity';
import { CecaDomicilioBeneficiario } from './entities/ceca-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CecaBeneficiario, CecaBeneficio, CecaDomicilioBeneficiario])],
  controllers: [CecaPubController],
  providers: [CecaPubService],
})
export class CecaPubModule {}
