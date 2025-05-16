import { Module } from '@nestjs/common';
import { JalaService } from './jala.service';
import { JalaController } from './jala.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JalaBeneficiario } from './entities/jala-beneficiario.entity';
import { JalaBeneficio } from './entities/jala-beneficio.entity';
import { JalaDomicilioBeneficiario } from './entities/jala-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JalaBeneficiario, JalaBeneficio, JalaDomicilioBeneficiario])],
  controllers: [JalaController],
  providers: [JalaService],
})
export class JalaModule {}
