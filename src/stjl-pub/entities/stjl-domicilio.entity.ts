import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { StjlBeneficiario } from './stjl-beneficiario.entity';

@Entity('identificacion_domicilio_geografico_stjl') // Nombre de la tabla en la base de datos
export class StjlDomicilioBeneficiario {
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

  @ManyToOne(() => StjlBeneficiario, beneficiario => beneficiario.domicilios)
  @JoinColumn({ name: 'id_beneficiario_stjl' })
  beneficiario: StjlBeneficiario;
}
