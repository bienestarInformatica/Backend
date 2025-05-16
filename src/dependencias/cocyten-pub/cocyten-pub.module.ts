import { Module } from '@nestjs/common';
import { CocytenPubService } from './cocyten-pub.service';
import { CocytenPubController } from './cocyten-pub.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CocytenBeneficiario } from './entities/cocyten-beneficiario.entity';
import { CocytenBeneficio } from './entities/cocyten-beneficio.entity';
import { CocytenDomicilioBeneficiario } from './entities/cocyten-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CocytenBeneficiario, CocytenBeneficio, CocytenDomicilioBeneficiario])],
  controllers: [CocytenPubController],
  providers: [CocytenPubService],
})
export class CocytenPubModule {}
