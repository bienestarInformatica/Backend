import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { InjuvePubModule } from './injuve-pub/injuve-pub.module';
import { SebienPubModule } from './sebien-pub/sebien-pub.module';
import { CecanPubModule } from './cecan-pub/cecan-pub.module';
import { DifPubModule } from './dif-pub/dif-pub.module';
import { IprovinayPubModule } from './iprovinay-pub/iprovinay-pub.module';
import { StjlPubModule } from './stjl-pub/stjl-pub.module';
import { BeneficiarioGeneralModule } from './beneficiario-general/beneficiario-general.module';
import { SdsPubModule } from './sds-pub/sds-pub.module';
import { SsypcModule } from './ssypc/ssypc.module';
import { SemoviPubModule } from './semovi-pub/semovi-pub.module';
import { EconomiaPubModule } from './economia-pub/economia-pub.module';
import { CocytenPubModule } from './cocyten-pub/cocyten-pub.module';
import { IcatenPubModule } from './icaten-pub/icaten-pub.module';
import { CjfamiliarPubModule } from './cjfamiliar-pub/cjfamiliar-pub.module';
import { ShgbPubModule } from './shgb-pub/shgb-pub.module';
import { CecaPubModule } from './ceca-pub/ceca-pub.module';
import typeorm from './config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    AuthModule,
    UsersModule,
    InjuvePubModule,
    SebienPubModule,
    CecanPubModule,
    DifPubModule,
    IprovinayPubModule,
    StjlPubModule,
    BeneficiarioGeneralModule,
    SdsPubModule,
    SsypcModule,
    SemoviPubModule,
    EconomiaPubModule,
    CocytenPubModule,
    IcatenPubModule,
    CjfamiliarPubModule,
    ShgbPubModule,
    CecaPubModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }