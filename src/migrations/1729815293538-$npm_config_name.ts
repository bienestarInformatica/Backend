import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1729815293538 implements MigrationInterface {
    name = ' $npmConfigName1729815293538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "identificacion_domicilio_geografico_ssypc" ("id" SERIAL NOT NULL, "tipo_vial" character varying(255) NOT NULL, "nom_vial" character varying(255) NOT NULL, "num_int_num" character varying(5) NOT NULL, "num_int_alf" character varying(35), "nom_loc" character varying(255) NOT NULL, "cve_loc" character varying(4) NOT NULL, "nom_mun" character varying(255) NOT NULL, "cve_mun" character varying(3) NOT NULL, "nom_ent" character varying(255) NOT NULL, "cve_ent" character varying(2) NOT NULL, "observaciones" character varying(255), "id_beneficiario_ssypc" integer, CONSTRAINT "PK_d055ceadde170b322a3adcdf901" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "beneficiario_ssypc" ("id_beneficiario_ssypc" SERIAL NOT NULL, "curp" character varying(18) NOT NULL, "primer_apellido" character varying(50) NOT NULL, "segundo_apellido" character varying(50) NOT NULL, "nombre" character varying(50) NOT NULL, "fecha_nacimiento" character varying(8) NOT NULL, "cve_ent_nac" character varying(2) NOT NULL, "sexo" character varying(1) NOT NULL, "discapacidad" character varying(2) NOT NULL, "indigena" character varying(2) NOT NULL, "cve_civil" character varying(2) NOT NULL, CONSTRAINT "PK_71b9ad381e5b2745c7b16a405fe" PRIMARY KEY ("id_beneficiario_ssypc"))`);
        await queryRunner.query(`CREATE TABLE "beneficio_ssypc" ("id_beneficio" SERIAL NOT NULL, "cve_dependencia" character varying(2) NOT NULL, "cve_institucion" character varying(5) NOT NULL, "cve_programa" character varying(4) NOT NULL, "cve_intra_programa" character varying(2) NOT NULL, "cve_ent_fed" numeric(2) NOT NULL, "cve_municipio" character varying(3) NOT NULL, "cve_localidad" character varying(4) NOT NULL, "fecha_beneficio" character varying(8) NOT NULL, "cve_tipo_beneficiario" character varying(2) NOT NULL, "cve_tipo_beneficio" character varying(3) NOT NULL, "cantidad_apoyo" numeric(16,2) NOT NULL, "id_beneficiario_ssypc" integer, CONSTRAINT "PK_7d52e194778d82dfe941df0a624" PRIMARY KEY ("id_beneficio"))`);
        await queryRunner.query(`CREATE TABLE "beneficio_shgb" ("id_beneficio" SERIAL NOT NULL, "cve_dependencia" character varying(2) NOT NULL, "cve_institucion" character varying(5) NOT NULL, "cve_programa" character varying(4) NOT NULL, "cve_intra_programa" character varying(2) NOT NULL, "cve_ent_fed" numeric(2) NOT NULL, "cve_municipio" character varying(3) NOT NULL, "cve_localidad" character varying(4) NOT NULL, "fecha_beneficio" character varying(8) NOT NULL, "cve_tipo_beneficiario" character varying(2) NOT NULL, "cve_tipo_beneficio" character varying(3) NOT NULL, "cantidad_apoyo" numeric(16,2) NOT NULL, "id_beneficiario_shgb" integer, CONSTRAINT "PK_978f746026fa0a2c0e58f87a245" PRIMARY KEY ("id_beneficio"))`);
        await queryRunner.query(`CREATE TABLE "identificacion_domicilio_geografico_shgb" ("id" SERIAL NOT NULL, "tipo_vial" character varying(255) NOT NULL, "nom_vial" character varying(255) NOT NULL, "num_int_num" character varying(5) NOT NULL, "num_int_alf" character varying(35), "nom_loc" character varying(255) NOT NULL, "cve_loc" character varying(4) NOT NULL, "nom_mun" character varying(255) NOT NULL, "cve_mun" character varying(3) NOT NULL, "nom_ent" character varying(255) NOT NULL, "cve_ent" character varying(2) NOT NULL, "observaciones" character varying(255), "id_beneficiario_shgb" integer, CONSTRAINT "PK_a6a6b1843366f481883e48cb442" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "beneficiario_shgb" ("id_beneficiario_shgb" SERIAL NOT NULL, "curp" character varying(18) NOT NULL, "primer_apellido" character varying(50) NOT NULL, "segundo_apellido" character varying(50) NOT NULL, "nombre" character varying(50) NOT NULL, "fecha_nacimiento" character varying(8) NOT NULL, "cve_ent_nac" character varying(2) NOT NULL, "sexo" character varying(1) NOT NULL, "discapacidad" character varying(2) NOT NULL, "indigena" character varying(2) NOT NULL, "cve_civil" character varying(2) NOT NULL, CONSTRAINT "PK_1c1eb3e883e694fc4e03922c7d7" PRIMARY KEY ("id_beneficiario_shgb"))`);
        await queryRunner.query(`CREATE TABLE "beneficio_semovi" ("id_beneficio" SERIAL NOT NULL, "cve_dependencia" character varying(2) NOT NULL, "cve_institucion" character varying(5) NOT NULL, "cve_programa" character varying(4) NOT NULL, "cve_intra_programa" character varying(2) NOT NULL, "cve_ent_fed" numeric(2) NOT NULL, "cve_municipio" character varying(3) NOT NULL, "cve_localidad" character varying(4) NOT NULL, "fecha_beneficio" character varying(8) NOT NULL, "cve_tipo_beneficiario" character varying(2) NOT NULL, "cve_tipo_beneficio" character varying(3) NOT NULL, "cantidad_apoyo" numeric(16,2) NOT NULL, "id_beneficiario_semovi" integer, CONSTRAINT "PK_e1b655a7444d40bcc3b57532a3b" PRIMARY KEY ("id_beneficio"))`);
        await queryRunner.query(`CREATE TABLE "beneficiario_semovi" ("id_beneficiario_semovi" SERIAL NOT NULL, "curp" character varying(18) NOT NULL, "primer_apellido" character varying(50) NOT NULL, "segundo_apellido" character varying(50) NOT NULL, "nombre" character varying(50) NOT NULL, "fecha_nacimiento" character varying(8) NOT NULL, "cve_ent_nac" character varying(2) NOT NULL, "sexo" character varying(1) NOT NULL, "discapacidad" character varying(2) NOT NULL, "indigena" character varying(2) NOT NULL, "cve_civil" character varying(2) NOT NULL, CONSTRAINT "PK_744d63a5e8ec59c5e2f67672108" PRIMARY KEY ("id_beneficiario_semovi"))`);
        await queryRunner.query(`CREATE TABLE "identificacion_domicilio_geografico_semovi" ("id" SERIAL NOT NULL, "tipo_vial" character varying(255) NOT NULL, "nom_vial" character varying(255) NOT NULL, "num_int_num" character varying(5) NOT NULL, "num_int_alf" character varying(35), "nom_loc" character varying(255) NOT NULL, "cve_loc" character varying(4) NOT NULL, "nom_mun" character varying(255) NOT NULL, "cve_mun" character varying(3) NOT NULL, "nom_ent" character varying(255) NOT NULL, "cve_ent" character varying(2) NOT NULL, "observaciones" character varying(255), "id_beneficiario_semovi" integer, CONSTRAINT "PK_a346ab6c3d000d11022112aa41e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "beneficio_sds" ("id_beneficio" SERIAL NOT NULL, "cve_dependencia" character varying(2) NOT NULL, "cve_institucion" character varying(5) NOT NULL, "cve_programa" character varying(4) NOT NULL, "cve_intra_programa" character varying(2) NOT NULL, "cve_ent_fed" numeric(2) NOT NULL, "cve_municipio" character varying(3) NOT NULL, "cve_localidad" character varying(4) NOT NULL, "fecha_beneficio" character varying(8) NOT NULL, "cve_tipo_beneficiario" character varying(2) NOT NULL, "cve_tipo_beneficio" character varying(3) NOT NULL, "cantidad_apoyo" numeric(16,2) NOT NULL, "id_beneficiario_sds" integer, CONSTRAINT "PK_18e6cb76af3fa1f2b26c7792006" PRIMARY KEY ("id_beneficio"))`);
        await queryRunner.query(`CREATE TABLE "beneficiario_sds" ("id_beneficiario_sds" SERIAL NOT NULL, "curp" character varying(18) NOT NULL, "primer_apellido" character varying(50) NOT NULL, "segundo_apellido" character varying(50) NOT NULL, "nombre" character varying(50) NOT NULL, "fecha_nacimiento" character varying(8) NOT NULL, "cve_ent_nac" character varying(2) NOT NULL, "sexo" character varying(1) NOT NULL, "discapacidad" character varying(2) NOT NULL, "indigena" character varying(2) NOT NULL, "cve_civil" character varying(2) NOT NULL, CONSTRAINT "PK_ddeabfa8e7fcf41da4699421193" PRIMARY KEY ("id_beneficiario_sds"))`);
        await queryRunner.query(`CREATE TABLE "identificacion_domicilio_geografico_sds" ("id" SERIAL NOT NULL, "tipo_vial" character varying(255) NOT NULL, "nom_vial" character varying(255) NOT NULL, "num_int_num" character varying(5) NOT NULL, "num_int_alf" character varying(35), "nom_loc" character varying(255) NOT NULL, "cve_loc" character varying(4) NOT NULL, "nom_mun" character varying(255) NOT NULL, "cve_mun" character varying(3) NOT NULL, "nom_ent" character varying(255) NOT NULL, "cve_ent" character varying(2) NOT NULL, "observaciones" character varying(255), "id_beneficiario_sds" integer, CONSTRAINT "PK_7d2d8b9240c28dcc0a4076aae77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "beneficio_icaten" ("id_beneficio" SERIAL NOT NULL, "cve_dependencia" character varying(2) NOT NULL, "cve_institucion" character varying(5) NOT NULL, "cve_programa" character varying(4) NOT NULL, "cve_intra_programa" character varying(2) NOT NULL, "cve_ent_fed" numeric(2) NOT NULL, "cve_municipio" character varying(3) NOT NULL, "cve_localidad" character varying(4) NOT NULL, "fecha_beneficio" character varying(8) NOT NULL, "cve_tipo_beneficiario" character varying(2) NOT NULL, "cve_tipo_beneficio" character varying(3) NOT NULL, "cantidad_apoyo" numeric(16,2) NOT NULL, "id_beneficiario_icaten" integer, CONSTRAINT "PK_2ea974c73040f6e82dcb4da5e3c" PRIMARY KEY ("id_beneficio"))`);
        await queryRunner.query(`CREATE TABLE "beneficiario_icaten" ("id_beneficiario_icaten" SERIAL NOT NULL, "curp" character varying(18) NOT NULL, "primer_apellido" character varying(50) NOT NULL, "segundo_apellido" character varying(50) NOT NULL, "nombre" character varying(50) NOT NULL, "fecha_nacimiento" character varying(8) NOT NULL, "cve_ent_nac" character varying(2) NOT NULL, "sexo" character varying(1) NOT NULL, "discapacidad" character varying(2) NOT NULL, "indigena" character varying(2) NOT NULL, "cve_civil" character varying(2) NOT NULL, CONSTRAINT "PK_8909dc45e6421ac17f580383ee4" PRIMARY KEY ("id_beneficiario_icaten"))`);
        await queryRunner.query(`CREATE TABLE "identificacion_domicilio_geografico_icaten" ("id" SERIAL NOT NULL, "tipo_vial" character varying(255) NOT NULL, "nom_vial" character varying(255) NOT NULL, "num_int_num" character varying(5) NOT NULL, "num_int_alf" character varying(35), "nom_loc" character varying(255) NOT NULL, "cve_loc" character varying(4) NOT NULL, "nom_mun" character varying(255) NOT NULL, "cve_mun" character varying(3) NOT NULL, "nom_ent" character varying(255) NOT NULL, "cve_ent" character varying(2) NOT NULL, "observaciones" character varying(255), "id_beneficiario_icaten" integer, CONSTRAINT "PK_bbe0d7e0c648bf843567b07f18e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "identificacion_domicilio_geografico_economia" ("id" SERIAL NOT NULL, "tipo_vial" character varying(255) NOT NULL, "nom_vial" character varying(255) NOT NULL, "num_int_num" character varying(5) NOT NULL, "num_int_alf" character varying(35), "nom_loc" character varying(255) NOT NULL, "cve_loc" character varying(4) NOT NULL, "nom_mun" character varying(255) NOT NULL, "cve_mun" character varying(3) NOT NULL, "nom_ent" character varying(255) NOT NULL, "cve_ent" character varying(2) NOT NULL, "observaciones" character varying(255), "id_beneficiario_economia" integer, CONSTRAINT "PK_fe16be4ea00aec439021147c076" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "beneficiario_economia" ("id_beneficiario_economia" SERIAL NOT NULL, "curp" character varying(18) NOT NULL, "primer_apellido" character varying(50) NOT NULL, "segundo_apellido" character varying(50) NOT NULL, "nombre" character varying(50) NOT NULL, "fecha_nacimiento" character varying(8) NOT NULL, "cve_ent_nac" character varying(2) NOT NULL, "sexo" character varying(1) NOT NULL, "discapacidad" character varying(2) NOT NULL, "indigena" character varying(2) NOT NULL, "cve_civil" character varying(2) NOT NULL, CONSTRAINT "PK_3dc599e92aa0d9f07c5bdfbf628" PRIMARY KEY ("id_beneficiario_economia"))`);
        await queryRunner.query(`CREATE TABLE "beneficio_economia" ("id_beneficio" SERIAL NOT NULL, "cve_dependencia" character varying(2) NOT NULL, "cve_institucion" character varying(5) NOT NULL, "cve_programa" character varying(4) NOT NULL, "cve_intra_programa" character varying(2) NOT NULL, "cve_ent_fed" numeric(2) NOT NULL, "cve_municipio" character varying(3) NOT NULL, "cve_localidad" character varying(4) NOT NULL, "fecha_beneficio" character varying(8) NOT NULL, "cve_tipo_beneficiario" character varying(2) NOT NULL, "cve_tipo_beneficio" character varying(3) NOT NULL, "cantidad_apoyo" numeric(16,2) NOT NULL, "id_beneficiario_economia" integer, CONSTRAINT "PK_780d6b03c39c4b9bcd1255239ff" PRIMARY KEY ("id_beneficio"))`);
        await queryRunner.query(`CREATE TABLE "beneficio_cocyten" ("id_beneficio" SERIAL NOT NULL, "cve_dependencia" character varying(2) NOT NULL, "cve_institucion" character varying(5) NOT NULL, "cve_programa" character varying(4) NOT NULL, "cve_intra_programa" character varying(2) NOT NULL, "cve_ent_fed" numeric(2) NOT NULL, "cve_municipio" character varying(3) NOT NULL, "cve_localidad" character varying(4) NOT NULL, "fecha_beneficio" character varying(8) NOT NULL, "cve_tipo_beneficiario" character varying(2) NOT NULL, "cve_tipo_beneficio" character varying(3) NOT NULL, "cantidad_apoyo" numeric(16,2) NOT NULL, "id_beneficiario_cocyten" integer, CONSTRAINT "PK_762c442c9ffa6863d3519569a38" PRIMARY KEY ("id_beneficio"))`);
        await queryRunner.query(`CREATE TABLE "beneficiario_cocyten" ("id_beneficiario_cocyten" SERIAL NOT NULL, "curp" character varying(18) NOT NULL, "primer_apellido" character varying(50) NOT NULL, "segundo_apellido" character varying(50) NOT NULL, "nombre" character varying(50) NOT NULL, "fecha_nacimiento" character varying(8) NOT NULL, "cve_ent_nac" character varying(2) NOT NULL, "sexo" character varying(1) NOT NULL, "discapacidad" character varying(2) NOT NULL, "indigena" character varying(2) NOT NULL, "cve_civil" character varying(2) NOT NULL, CONSTRAINT "PK_387a5187017787b44594d3b68f4" PRIMARY KEY ("id_beneficiario_cocyten"))`);
        await queryRunner.query(`CREATE TABLE "identificacion_domicilio_geografico_cocyten" ("id" SERIAL NOT NULL, "tipo_vial" character varying(255) NOT NULL, "nom_vial" character varying(255) NOT NULL, "num_int_num" character varying(5) NOT NULL, "num_int_alf" character varying(35), "nom_loc" character varying(255) NOT NULL, "cve_loc" character varying(4) NOT NULL, "nom_mun" character varying(255) NOT NULL, "cve_mun" character varying(3) NOT NULL, "nom_ent" character varying(255) NOT NULL, "cve_ent" character varying(2) NOT NULL, "observaciones" character varying(255), "id_beneficiario_cocyten" integer, CONSTRAINT "PK_8e3678061867ceceea819bf08f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "beneficio_cjfamiliar" ("id_beneficio" SERIAL NOT NULL, "cve_dependencia" character varying(2) NOT NULL, "cve_institucion" character varying(5) NOT NULL, "cve_programa" character varying(4) NOT NULL, "cve_intra_programa" character varying(2) NOT NULL, "cve_ent_fed" numeric(2) NOT NULL, "cve_municipio" character varying(3) NOT NULL, "cve_localidad" character varying(4) NOT NULL, "fecha_beneficio" character varying(8) NOT NULL, "cve_tipo_beneficiario" character varying(2) NOT NULL, "cve_tipo_beneficio" character varying(3) NOT NULL, "cantidad_apoyo" numeric(16,2) NOT NULL, "id_beneficiario_cjfamiliar" integer, CONSTRAINT "PK_3e325e83a56c90534af8812add1" PRIMARY KEY ("id_beneficio"))`);
        await queryRunner.query(`CREATE TABLE "beneficiario_cjfamiliar" ("id_beneficiario_cjfamiliar" SERIAL NOT NULL, "curp" character varying(18) NOT NULL, "primer_apellido" character varying(50) NOT NULL, "segundo_apellido" character varying(50) NOT NULL, "nombre" character varying(50) NOT NULL, "fecha_nacimiento" character varying(8) NOT NULL, "cve_ent_nac" character varying(2) NOT NULL, "sexo" character varying(1) NOT NULL, "discapacidad" character varying(2) NOT NULL, "indigena" character varying(2) NOT NULL, "cve_civil" character varying(2) NOT NULL, CONSTRAINT "PK_a965d48427bcbe7400f3b0776cc" PRIMARY KEY ("id_beneficiario_cjfamiliar"))`);
        await queryRunner.query(`CREATE TABLE "identificacion_domicilio_geografico_cjfamiliar" ("id" SERIAL NOT NULL, "tipo_vial" character varying(255) NOT NULL, "nom_vial" character varying(255) NOT NULL, "num_int_num" character varying(5) NOT NULL, "num_int_alf" character varying(35), "nom_loc" character varying(255) NOT NULL, "cve_loc" character varying(4) NOT NULL, "nom_mun" character varying(255) NOT NULL, "cve_mun" character varying(3) NOT NULL, "nom_ent" character varying(255) NOT NULL, "cve_ent" character varying(2) NOT NULL, "observaciones" character varying(255), "id_beneficiario_cjfamiliar" integer, CONSTRAINT "PK_969dfa533fb987c7a52313c2349" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "identificacion_domicilio_geografico_ceca" ("id" SERIAL NOT NULL, "tipo_vial" character varying(255) NOT NULL, "nom_vial" character varying(255) NOT NULL, "num_int_num" character varying(5) NOT NULL, "num_int_alf" character varying(35), "nom_loc" character varying(255) NOT NULL, "cve_loc" character varying(4) NOT NULL, "nom_mun" character varying(255) NOT NULL, "cve_mun" character varying(3) NOT NULL, "nom_ent" character varying(255) NOT NULL, "cve_ent" character varying(2) NOT NULL, "observaciones" character varying(255), "id_beneficiario_cecan" integer, CONSTRAINT "PK_24b98e20c21ecfd506664cc4f2a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "beneficiario_ceca" ("id_beneficiario_ceca" SERIAL NOT NULL, "curp" character varying(18) NOT NULL, "primer_apellido" character varying(50) NOT NULL, "segundo_apellido" character varying(50) NOT NULL, "nombre" character varying(50) NOT NULL, "fecha_nacimiento" character varying(8) NOT NULL, "cve_ent_nac" character varying(2) NOT NULL, "sexo" character varying(1) NOT NULL, "discapacidad" character varying(2) NOT NULL, "indigena" character varying(2) NOT NULL, "cve_civil" character varying(2) NOT NULL, CONSTRAINT "PK_98139f2f0d542fcd0e10365369f" PRIMARY KEY ("id_beneficiario_ceca"))`);
        await queryRunner.query(`CREATE TABLE "beneficio_ceca" ("id_beneficio" SERIAL NOT NULL, "cve_dependencia" character varying(2) NOT NULL, "cve_institucion" character varying(5) NOT NULL, "cve_programa" character varying(4) NOT NULL, "cve_intra_programa" character varying(2) NOT NULL, "cve_ent_fed" numeric(2) NOT NULL, "cve_municipio" character varying(3) NOT NULL, "cve_localidad" character varying(4) NOT NULL, "fecha_beneficio" character varying(8) NOT NULL, "cve_tipo_beneficiario" character varying(2) NOT NULL, "cve_tipo_beneficio" character varying(3) NOT NULL, "cantidad_apoyo" numeric(16,2) NOT NULL, "id_beneficiario_cecan" integer, CONSTRAINT "PK_f5f2424e6eb2c3fe401c345e17c" PRIMARY KEY ("id_beneficio"))`);
        await queryRunner.query(`ALTER TABLE "identificacion_domicilio_geografico_ssypc" ADD CONSTRAINT "FK_1f4a82586e91c19737eb53df1b5" FOREIGN KEY ("id_beneficiario_ssypc") REFERENCES "beneficiario_ssypc"("id_beneficiario_ssypc") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beneficio_ssypc" ADD CONSTRAINT "FK_2a9b10081d01467f3a66ff0a716" FOREIGN KEY ("id_beneficiario_ssypc") REFERENCES "beneficiario_ssypc"("id_beneficiario_ssypc") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beneficio_shgb" ADD CONSTRAINT "FK_920d86c30c179eb0439386f819d" FOREIGN KEY ("id_beneficiario_shgb") REFERENCES "beneficiario_shgb"("id_beneficiario_shgb") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "identificacion_domicilio_geografico_shgb" ADD CONSTRAINT "FK_a532812a475d467765bee51c135" FOREIGN KEY ("id_beneficiario_shgb") REFERENCES "beneficiario_shgb"("id_beneficiario_shgb") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beneficio_semovi" ADD CONSTRAINT "FK_62874ad04c8e409266f06b70f5d" FOREIGN KEY ("id_beneficiario_semovi") REFERENCES "beneficiario_semovi"("id_beneficiario_semovi") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "identificacion_domicilio_geografico_semovi" ADD CONSTRAINT "FK_e818e52390cc4f0c28a4d65883e" FOREIGN KEY ("id_beneficiario_semovi") REFERENCES "beneficiario_semovi"("id_beneficiario_semovi") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beneficio_sds" ADD CONSTRAINT "FK_26e88ffe7653fd71294f563db75" FOREIGN KEY ("id_beneficiario_sds") REFERENCES "beneficiario_sds"("id_beneficiario_sds") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "identificacion_domicilio_geografico_sds" ADD CONSTRAINT "FK_6235f37c499178b8d6eec6ee720" FOREIGN KEY ("id_beneficiario_sds") REFERENCES "beneficiario_sds"("id_beneficiario_sds") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beneficio_icaten" ADD CONSTRAINT "FK_66159654663d1968b4afa6044bb" FOREIGN KEY ("id_beneficiario_icaten") REFERENCES "beneficiario_icaten"("id_beneficiario_icaten") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "identificacion_domicilio_geografico_icaten" ADD CONSTRAINT "FK_0e08bb8b2a65e7b13a7bb624174" FOREIGN KEY ("id_beneficiario_icaten") REFERENCES "beneficiario_icaten"("id_beneficiario_icaten") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "identificacion_domicilio_geografico_economia" ADD CONSTRAINT "FK_eabdb267278cbb6bf82892bc821" FOREIGN KEY ("id_beneficiario_economia") REFERENCES "beneficiario_economia"("id_beneficiario_economia") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beneficio_economia" ADD CONSTRAINT "FK_2111f2b58569d67463118536505" FOREIGN KEY ("id_beneficiario_economia") REFERENCES "beneficiario_economia"("id_beneficiario_economia") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beneficio_cocyten" ADD CONSTRAINT "FK_1d2f78177abfaa0de263901c461" FOREIGN KEY ("id_beneficiario_cocyten") REFERENCES "beneficiario_cocyten"("id_beneficiario_cocyten") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "identificacion_domicilio_geografico_cocyten" ADD CONSTRAINT "FK_b44c6945fdf83cebb58f4069d50" FOREIGN KEY ("id_beneficiario_cocyten") REFERENCES "beneficiario_cocyten"("id_beneficiario_cocyten") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beneficio_cjfamiliar" ADD CONSTRAINT "FK_dd33de204f8b41ab3c054e29ec6" FOREIGN KEY ("id_beneficiario_cjfamiliar") REFERENCES "beneficiario_cjfamiliar"("id_beneficiario_cjfamiliar") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "identificacion_domicilio_geografico_cjfamiliar" ADD CONSTRAINT "FK_b2e636871d15972071d6e5df04c" FOREIGN KEY ("id_beneficiario_cjfamiliar") REFERENCES "beneficiario_cjfamiliar"("id_beneficiario_cjfamiliar") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "identificacion_domicilio_geografico_ceca" ADD CONSTRAINT "FK_753c64c7acf3aff596ed071a48f" FOREIGN KEY ("id_beneficiario_cecan") REFERENCES "beneficiario_ceca"("id_beneficiario_ceca") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beneficio_ceca" ADD CONSTRAINT "FK_6017d6b77b0d91e0a48fed5e3c7" FOREIGN KEY ("id_beneficiario_cecan") REFERENCES "beneficiario_ceca"("id_beneficiario_ceca") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "beneficio_ceca" DROP CONSTRAINT "FK_6017d6b77b0d91e0a48fed5e3c7"`);
        await queryRunner.query(`ALTER TABLE "identificacion_domicilio_geografico_ceca" DROP CONSTRAINT "FK_753c64c7acf3aff596ed071a48f"`);
        await queryRunner.query(`ALTER TABLE "identificacion_domicilio_geografico_cjfamiliar" DROP CONSTRAINT "FK_b2e636871d15972071d6e5df04c"`);
        await queryRunner.query(`ALTER TABLE "beneficio_cjfamiliar" DROP CONSTRAINT "FK_dd33de204f8b41ab3c054e29ec6"`);
        await queryRunner.query(`ALTER TABLE "identificacion_domicilio_geografico_cocyten" DROP CONSTRAINT "FK_b44c6945fdf83cebb58f4069d50"`);
        await queryRunner.query(`ALTER TABLE "beneficio_cocyten" DROP CONSTRAINT "FK_1d2f78177abfaa0de263901c461"`);
        await queryRunner.query(`ALTER TABLE "beneficio_economia" DROP CONSTRAINT "FK_2111f2b58569d67463118536505"`);
        await queryRunner.query(`ALTER TABLE "identificacion_domicilio_geografico_economia" DROP CONSTRAINT "FK_eabdb267278cbb6bf82892bc821"`);
        await queryRunner.query(`ALTER TABLE "identificacion_domicilio_geografico_icaten" DROP CONSTRAINT "FK_0e08bb8b2a65e7b13a7bb624174"`);
        await queryRunner.query(`ALTER TABLE "beneficio_icaten" DROP CONSTRAINT "FK_66159654663d1968b4afa6044bb"`);
        await queryRunner.query(`ALTER TABLE "identificacion_domicilio_geografico_sds" DROP CONSTRAINT "FK_6235f37c499178b8d6eec6ee720"`);
        await queryRunner.query(`ALTER TABLE "beneficio_sds" DROP CONSTRAINT "FK_26e88ffe7653fd71294f563db75"`);
        await queryRunner.query(`ALTER TABLE "identificacion_domicilio_geografico_semovi" DROP CONSTRAINT "FK_e818e52390cc4f0c28a4d65883e"`);
        await queryRunner.query(`ALTER TABLE "beneficio_semovi" DROP CONSTRAINT "FK_62874ad04c8e409266f06b70f5d"`);
        await queryRunner.query(`ALTER TABLE "identificacion_domicilio_geografico_shgb" DROP CONSTRAINT "FK_a532812a475d467765bee51c135"`);
        await queryRunner.query(`ALTER TABLE "beneficio_shgb" DROP CONSTRAINT "FK_920d86c30c179eb0439386f819d"`);
        await queryRunner.query(`ALTER TABLE "beneficio_ssypc" DROP CONSTRAINT "FK_2a9b10081d01467f3a66ff0a716"`);
        await queryRunner.query(`ALTER TABLE "identificacion_domicilio_geografico_ssypc" DROP CONSTRAINT "FK_1f4a82586e91c19737eb53df1b5"`);
        await queryRunner.query(`DROP TABLE "beneficio_ceca"`);
        await queryRunner.query(`DROP TABLE "beneficiario_ceca"`);
        await queryRunner.query(`DROP TABLE "identificacion_domicilio_geografico_ceca"`);
        await queryRunner.query(`DROP TABLE "identificacion_domicilio_geografico_cjfamiliar"`);
        await queryRunner.query(`DROP TABLE "beneficiario_cjfamiliar"`);
        await queryRunner.query(`DROP TABLE "beneficio_cjfamiliar"`);
        await queryRunner.query(`DROP TABLE "identificacion_domicilio_geografico_cocyten"`);
        await queryRunner.query(`DROP TABLE "beneficiario_cocyten"`);
        await queryRunner.query(`DROP TABLE "beneficio_cocyten"`);
        await queryRunner.query(`DROP TABLE "beneficio_economia"`);
        await queryRunner.query(`DROP TABLE "beneficiario_economia"`);
        await queryRunner.query(`DROP TABLE "identificacion_domicilio_geografico_economia"`);
        await queryRunner.query(`DROP TABLE "identificacion_domicilio_geografico_icaten"`);
        await queryRunner.query(`DROP TABLE "beneficiario_icaten"`);
        await queryRunner.query(`DROP TABLE "beneficio_icaten"`);
        await queryRunner.query(`DROP TABLE "identificacion_domicilio_geografico_sds"`);
        await queryRunner.query(`DROP TABLE "beneficiario_sds"`);
        await queryRunner.query(`DROP TABLE "beneficio_sds"`);
        await queryRunner.query(`DROP TABLE "identificacion_domicilio_geografico_semovi"`);
        await queryRunner.query(`DROP TABLE "beneficiario_semovi"`);
        await queryRunner.query(`DROP TABLE "beneficio_semovi"`);
        await queryRunner.query(`DROP TABLE "beneficiario_shgb"`);
        await queryRunner.query(`DROP TABLE "identificacion_domicilio_geografico_shgb"`);
        await queryRunner.query(`DROP TABLE "beneficio_shgb"`);
        await queryRunner.query(`DROP TABLE "beneficio_ssypc"`);
        await queryRunner.query(`DROP TABLE "beneficiario_ssypc"`);
        await queryRunner.query(`DROP TABLE "identificacion_domicilio_geografico_ssypc"`);
    }

}
