import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1724879518080 implements MigrationInterface {
    name = ' $npmConfigName1724879518080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "identificacion_domicilio_geografico_sds" ("id" SERIAL NOT NULL, "tipo_vial" character varying(255) NOT NULL, "nom_vial" character varying(255) NOT NULL, "num_int_num" character varying(5) NOT NULL, "num_int_alf" character varying(35), "nom_loc" character varying(255) NOT NULL, "cve_loc" character varying(4) NOT NULL, "nom_mun" character varying(255) NOT NULL, "cve_mun" character varying(3) NOT NULL, "nom_ent" character varying(255) NOT NULL, "cve_ent" character varying(2) NOT NULL, "observaciones" character varying(255), "id_beneficiario_sds" integer, CONSTRAINT "PK_7d2d8b9240c28dcc0a4076aae77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "beneficiario_sds" ("id_beneficiario_sds" SERIAL NOT NULL, "curp" character varying(18) NOT NULL, "primer_apellido" character varying(50) NOT NULL, "segundo_apellido" character varying(50) NOT NULL, "nombre" character varying(50) NOT NULL, "fecha_nacimiento" character varying(8) NOT NULL, "cve_ent_nac" character varying(2) NOT NULL, "sexo" character varying(1) NOT NULL, "discapacidad" character varying(2) NOT NULL, "indigena" character varying(2) NOT NULL, "cve_civil" character varying(2) NOT NULL, CONSTRAINT "PK_ddeabfa8e7fcf41da4699421193" PRIMARY KEY ("id_beneficiario_sds"))`);
        await queryRunner.query(`CREATE TABLE "beneficio_sds" ("id_beneficio" SERIAL NOT NULL, "cve_dependencia" character varying(2) NOT NULL, "cve_institucion" character varying(5) NOT NULL, "cve_programa" character varying(4) NOT NULL, "cve_intra_programa" character varying(2) NOT NULL, "cve_ent_fed" numeric(2) NOT NULL, "cve_municipio" character varying(3) NOT NULL, "cve_localidad" character varying(4) NOT NULL, "fecha_beneficio" character varying(8) NOT NULL, "cve_tipo_beneficiario" character varying(2) NOT NULL, "cve_tipo_beneficio" character varying(3) NOT NULL, "cantidad_apoyo" numeric(16,2) NOT NULL, "id_beneficiario_sds" integer, CONSTRAINT "PK_18e6cb76af3fa1f2b26c7792006" PRIMARY KEY ("id_beneficio"))`);
        await queryRunner.query(`ALTER TABLE "identificacion_domicilio_geografico_sds" ADD CONSTRAINT "FK_6235f37c499178b8d6eec6ee720" FOREIGN KEY ("id_beneficiario_sds") REFERENCES "beneficiario_sds"("id_beneficiario_sds") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beneficio_sds" ADD CONSTRAINT "FK_26e88ffe7653fd71294f563db75" FOREIGN KEY ("id_beneficiario_sds") REFERENCES "beneficiario_sds"("id_beneficiario_sds") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "beneficio_sds" DROP CONSTRAINT "FK_26e88ffe7653fd71294f563db75"`);
        await queryRunner.query(`ALTER TABLE "identificacion_domicilio_geografico_sds" DROP CONSTRAINT "FK_6235f37c499178b8d6eec6ee720"`);
        await queryRunner.query(`DROP TABLE "beneficio_sds"`);
        await queryRunner.query(`DROP TABLE "beneficiario_sds"`);
        await queryRunner.query(`DROP TABLE "identificacion_domicilio_geografico_sds"`);
    }

}
