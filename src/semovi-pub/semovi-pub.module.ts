import { Module } from '@nestjs/common';
import { SemoviPubService } from './semovi-pub.service';
import { SemoviPubController } from './semovi-pub.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SemoviBeneficiario } from './entities/semovi-beneficiario.entity';
import { SemoviBeneficio } from './entities/semovi-beneficio.entity';
import { SemoviDomicilioBeneficiario } from './entities/semovi-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SemoviBeneficiario, SemoviBeneficio, SemoviDomicilioBeneficiario])],
  controllers: [SemoviPubController],
  providers: [SemoviPubService],
})
export class SemoviPubModule {}
