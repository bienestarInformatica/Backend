import { Module } from '@nestjs/common';
import { SdsPubService } from './sds-pub.service';
import { SdsPubController } from './sds-pub.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SdsBeneficiario } from './entities/sds-beneficiario.entity';
import { SdsBeneficio } from './entities/sds-beneficio.entity';
import { SdsDomicilioBeneficiario } from './entities/sds-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SdsBeneficiario, SdsBeneficio, SdsDomicilioBeneficiario])],
  controllers: [SdsPubController],
  providers: [SdsPubService],
})
export class SdsPubModule {}
