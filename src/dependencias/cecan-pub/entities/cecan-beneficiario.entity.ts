import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CecanBeneficio } from './cecan-beneficio.entity';
import { CecanDomicilioBeneficiario } from './cecan-domicilio.entity';

@Entity('beneficiario_cecan') 
export class CecanBeneficiario {
  @PrimaryGeneratedColumn()
  id_beneficiario_cecan: number;

  @Column({ length: 18 })
  @IsString()
  @IsNotEmpty()
  curp: string;

  @Column({ length: 50 })
  @IsString()
  @IsNotEmpty()
  primer_apellido: string;

  @Column({ length: 50 })
  @IsString()
  @IsNotEmpty()
  segundo_apellido: string;

  @Column({ length: 50 })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @Column({ length: 8 })
  @IsString()
  @IsNotEmpty()
  fecha_nacimiento: string;

  @Column({ length: 2 })
  @IsString()
  @IsNotEmpty()
  cve_ent_nac: string;

  @Column({ length: 1 })
  @IsString()
  @IsNotEmpty()
  sexo: string;

  @Column({ length: 2 })
  @IsString()
  @IsNotEmpty()
  discapacidad: string;

  @Column({ length: 2 })
  @IsString()
  @IsNotEmpty()
  indigena: string;

  @Column({ length: 2})
  @IsString()
  @IsNotEmpty()
  cve_civil: string;

  @OneToMany(() => CecanBeneficio, beneficio => beneficio.beneficiario)
  beneficios: CecanBeneficio[];

  @OneToMany(() => CecanDomicilioBeneficiario, domicilio => domicilio.beneficiario)
  domicilios: CecanDomicilioBeneficiario[];
}