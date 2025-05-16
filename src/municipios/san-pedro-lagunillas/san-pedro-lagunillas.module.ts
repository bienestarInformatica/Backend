import { Module } from '@nestjs/common';
import { SanPedroLagunillasService } from './san-pedro-lagunillas.service';
import { SanPedroLagunillasController } from './san-pedro-lagunillas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SanPedroLagunillasBeneficiario } from './entities/san-pedro-lagunillas-beneficiario.entity';
import { SanPedroLagunillasBeneficio } from './entities/san-pedro-lagunillas-beneficio.entity';
import { SanPedroLagunillasDomicilioBeneficiario } from './entities/san-pedro-lagunillas-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SanPedroLagunillasBeneficiario, SanPedroLagunillasBeneficio, SanPedroLagunillasDomicilioBeneficiario])],
  controllers: [SanPedroLagunillasController],
  providers: [SanPedroLagunillasService],
})
export class SanPedroLagunillasModule {}
