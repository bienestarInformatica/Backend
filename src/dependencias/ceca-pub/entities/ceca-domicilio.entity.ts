import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CecaBeneficiario } from './ceca-beneficiario.entity';

@Entity('identificacion_domicilio_geografico_ceca')
export class CecaDomicilioBeneficiario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  @IsString()
  @IsNotEmpty()
  tipo_vial: string;

  @Column({ length: 255 })
  @IsString()
  @IsNotEmpty()
  nom_vial: string;

  @Column({ length: 5 })
  @IsString()
  @IsNotEmpty()
  num_int_num: string;

  @Column({ length: 35, nullable: true })
  @IsString()
  num_int_alf: string;

  @Column({ length: 255 })
  @IsString()
  @IsNotEmpty()
  nom_loc: string;

  @Column({ length: 4 })
  @IsString()
  @IsNotEmpty()
  cve_loc: string;

  @Column({ length: 255 })
  @IsString()
  @IsNotEmpty()
  nom_mun: string;

  @Column({ length: 3 })
  @IsString()
  @IsNotEmpty()
  cve_mun: string;

  @Column({ length: 255 })
  @IsString()
  @IsNotEmpty()
  nom_ent: string;

  @Column({ length: 2 })
  @IsString()
  @IsNotEmpty()
  cve_ent: string;

  @Column({ length: 255, nullable: true })
  @IsString()
  observaciones: string;

  @ManyToOne(() => CecaBeneficiario, beneficiario => beneficiario.domicilios)
  @JoinColumn({ name: 'id_beneficiario_cecan' })
  beneficiario: CecaBeneficiario;
}
