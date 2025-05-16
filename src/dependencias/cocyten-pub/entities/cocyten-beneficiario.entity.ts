import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CocytenBeneficio } from './cocyten-beneficio.entity';
import { CocytenDomicilioBeneficiario } from './cocyten-domicilio.entity';

@Entity('beneficiario_cocyten')
export class CocytenBeneficiario {
  @PrimaryGeneratedColumn()
  id_beneficiario_cocyten: number;

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

  @OneToMany(() => CocytenBeneficio, beneficio => beneficio.beneficiario)
  beneficios: CocytenBeneficio[];

  @OneToMany(() => CocytenDomicilioBeneficiario, domicilio => domicilio.beneficiario)
  domicilios: CocytenDomicilioBeneficiario[];
}
