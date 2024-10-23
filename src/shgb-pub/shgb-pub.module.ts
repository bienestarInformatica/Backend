import { Module } from '@nestjs/common';
import { ShgbPubService } from './shgb-pub.service';
import { ShgbPubController } from './shgb-pub.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShgbBeneficiario } from './entities/shgb-beneficiarios.entity';
import { ShgbBeneficio } from './entities/shgb-beneficio.entity';
import { ShgbDomicilioBeneficiario } from './entities/shgb-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShgbBeneficiario, ShgbBeneficio, ShgbDomicilioBeneficiario])],
  controllers: [ShgbPubController],
  providers: [ShgbPubService],
})
export class ShgbPubModule {}
