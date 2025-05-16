import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { InjuvePubModule } from './dependencias/injuve-pub/injuve-pub.module';
import { SebienPubModule } from './dependencias/sebien-pub/sebien-pub.module';
import { CecanPubModule } from './dependencias/cecan-pub/cecan-pub.module';
import { DifPubModule } from './dependencias/dif-pub/dif-pub.module';
import { IprovinayPubModule } from './dependencias/iprovinay-pub/iprovinay-pub.module';
import { StjlPubModule } from './dependencias/stjl-pub/stjl-pub.module';
import { BeneficiarioGeneralModule } from './beneficiario-general/beneficiario-general.module';
import { SdsPubModule } from './dependencias/sds-pub/sds-pub.module';
import { SsypcModule } from './dependencias/ssypc/ssypc.module';
import { SemoviPubModule } from './dependencias/semovi-pub/semovi-pub.module';
import { EconomiaPubModule } from './dependencias/economia-pub/economia-pub.module';
import { CocytenPubModule } from './dependencias/cocyten-pub/cocyten-pub.module';
import { IcatenPubModule } from './dependencias/icaten-pub/icaten-pub.module';
import { CjfamiliarPubModule } from './dependencias/cjfamiliar-pub/cjfamiliar-pub.module';
import { ShgbPubModule } from './dependencias/shgb-pub/shgb-pub.module';
import { CecaPubModule } from './dependencias/ceca-pub/ceca-pub.module';
import typeorm from './config/typeorm';
import { TepicModule } from './municipios/tepic/tepic.module';
import { AcaponetaModule } from './municipios/acaponeta/acaponeta.module';
import { TuxpanModule } from './municipios/tuxpan/tuxpan.module';
import { AhuacatlanModule } from './municipios/ahuacatlan/ahuacatlan.module';
import { AmatlanCañasModule } from './municipios/amatlan-cañas/amatlan-cañas.module';
import { BahiaBanderasModule } from './municipios/bahia-banderas/bahia-banderas.module';
import { CompostelaModule } from './municipios/compostela/compostela.module';
import { HuajicoriModule } from './municipios/huajicori/huajicori.module';
import { IxtlanModule } from './municipios/ixtlan/ixtlan.module';
import { JalaModule } from './municipios/jala/jala.module';
import { NayarModule } from './municipios/nayar/nayar.module';
import { RosamoradaModule } from './municipios/rosamorada/rosamorada.module';
import { RuizModule } from './municipios/ruiz/ruiz.module';
import { SanBlasModule } from './municipios/san-blas/san-blas.module';
import { SanPedroLagunillasModule } from './municipios/san-pedro-lagunillas/san-pedro-lagunillas.module';
import { SantaMariaOroModule } from './municipios/santa-maria-oro/santa-maria-oro.module';
import { SantiagoIxcuintlaModule } from './municipios/santiago-ixcuintla/santiago-ixcuintla.module';
import { TecualaModule } from './municipios/tecuala/tecuala.module';

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
    TepicModule,
    AcaponetaModule,
    TuxpanModule,
    AhuacatlanModule,
    AmatlanCañasModule,
    BahiaBanderasModule,
    CompostelaModule,
    HuajicoriModule,
    IxtlanModule,
    JalaModule,
    NayarModule,
    RosamoradaModule,
    RuizModule,
    SanBlasModule,
    SanPedroLagunillasModule,
    SantaMariaOroModule,
    SantiagoIxcuintlaModule,
    TecualaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }