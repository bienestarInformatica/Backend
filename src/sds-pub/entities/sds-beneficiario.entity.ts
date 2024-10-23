import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { SdsBeneficio } from './sds-beneficio.entity';
import { SdsDomicilioBeneficiario } from './sds-domicilio.entity';

@Entity('beneficiario_sds')
export class SdsBeneficiario {
  @PrimaryGeneratedColumn()
  id_beneficiario_sds: number;

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

  @OneToMany(() => SdsBeneficio, beneficio => beneficio.beneficiario)
  beneficios: SdsBeneficio[];

  @OneToMany(() => SdsDomicilioBeneficiario, domicilio => domicilio.beneficiario)
  domicilios: SdsDomicilioBeneficiario[];
}
