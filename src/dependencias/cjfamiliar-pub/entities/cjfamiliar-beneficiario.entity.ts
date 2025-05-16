import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CjfamiliarBeneficio } from './cjfamiliar-beneficio.entity';
import { CjfamiliarDomicilioBeneficiario } from './cjfamiliar-domicilio.entity';

@Entity('beneficiario_cjfamiliar')
export class CjfamiliarBeneficiario {
  @PrimaryGeneratedColumn()
  id_beneficiario_cjfamiliar: number;

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

  @OneToMany(() => CjfamiliarBeneficio, beneficio => beneficio.beneficiario)
  beneficios: CjfamiliarBeneficio[];

  @OneToMany(() => CjfamiliarDomicilioBeneficiario, domicilio => domicilio.beneficiario)
  domicilios: CjfamiliarDomicilioBeneficiario[];
}
