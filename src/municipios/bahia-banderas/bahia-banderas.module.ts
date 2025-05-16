import { Module } from '@nestjs/common';
import { BahiaBanderasService } from './bahia-banderas.service';
import { BahiaBanderasController } from './bahia-banderas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BahiaBeneficiario } from './entities/bahia-banderas-beneficiario.entity';
import { BahiaBeneficio } from './entities/bahia-banderas-beneficio.entity';
import { BahiaDomicilioBeneficiario } from './entities/bahia-banderas-domicilio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BahiaBeneficiario, BahiaBeneficio, BahiaDomicilioBeneficiario])], // Add your entities here
  controllers: [BahiaBanderasController],
  providers: [BahiaBanderasService],
})
export class BahiaBanderasModule {}
