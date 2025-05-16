import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { DifBeneficio } from './dif-beneficio.entity';
import { DifDomicilioBeneficiario } from './dif-domicilio.entity';

@Entity('beneficiario_dif') // Nombre de la tabla en la base de datos
export class DifBeneficiario {
  @PrimaryGeneratedColumn()
  id_beneficiario_dif: number;

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

  @Column({ length: 2 })
  @IsString()
  @IsNotEmpty()
  cve_civil: string;

  @OneToMany(() => DifBeneficio, beneficio => beneficio.beneficiario)
  beneficios: DifBeneficio[];

  @OneToMany(() => DifDomicilioBeneficiario, domicilio => domicilio.beneficiario)
  domicilios: DifDomicilioBeneficiario[];
}