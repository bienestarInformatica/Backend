import { Module } from '@nestjs/common';
import { EconomiaPubService } from './economia-pub.service';
import { EconomiaPubController } from './economia-pub.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EconomiaBeneficiario } from './entities/economia-beneficiario.entity';
import { EconomiaBeneficio } from './entities/economia-beneficio.entity';
import { EconomiaDomicilioBeneficiario } from './entities/economia-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EconomiaBeneficiario, EconomiaBeneficio, EconomiaDomicilioBeneficiario])],
  controllers: [EconomiaPubController],
  providers: [EconomiaPubService],
})
export class EconomiaPubModule {}
