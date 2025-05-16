import { Module } from '@nestjs/common';
import { CjfamiliarPubService } from './cjfamiliar-pub.service';
import { CjfamiliarPubController } from './cjfamiliar-pub.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CjfamiliarBeneficiario } from './entities/cjfamiliar-beneficiario.entity';
import { CjfamiliarBeneficio } from './entities/cjfamiliar-beneficio.entity';
import { CjfamiliarDomicilioBeneficiario } from './entities/cjfamiliar-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CjfamiliarBeneficiario, CjfamiliarBeneficio, CjfamiliarDomicilioBeneficiario])],
  controllers: [CjfamiliarPubController],
  providers: [CjfamiliarPubService],
})
export class CjfamiliarPubModule {}
