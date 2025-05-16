import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IprovinayBeneficio } from './iprovinay-beneficio.entity';
import { IprovinayDomicilioBeneficiario } from './iprovinay-domicilio.entity';

@Entity('beneficiario_iprovinay') // Nombre de la tabla en la base de datos
export class IprovinayBeneficiario {
  @PrimaryGeneratedColumn()
  id_beneficiario_iprovinay: number;

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

  @OneToMany(() => IprovinayBeneficio, beneficio => beneficio.beneficiario)
  beneficios: IprovinayBeneficio[];

  @OneToMany(() => IprovinayDomicilioBeneficiario, domicilio => domicilio.beneficiario)
  domicilios: IprovinayDomicilioBeneficiario[];
}