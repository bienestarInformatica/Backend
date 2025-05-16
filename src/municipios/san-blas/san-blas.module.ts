import { Module } from '@nestjs/common';
import { SanBlasService } from './san-blas.service';
import { SanBlasController } from './san-blas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SanBlasBeneficiario } from './entities/san-blas-beneficiario.entity';
import { SanBlasBeneficio } from './entities/san-blas-beneficio.entity';
import { SanBlasDomicilioBeneficiario } from './entities/san-blas.domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SanBlasBeneficiario, SanBlasBeneficio, SanBlasDomicilioBeneficiario])],
  controllers: [SanBlasController],
  providers: [SanBlasService],
})
export class SanBlasModule {}
