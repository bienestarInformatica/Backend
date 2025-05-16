import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { InjuveBeneficiario } from './injuve-beneficiario.entity';

@Entity('beneficio_injuve') // Nombre de la tabla en la base de datos
export class InjuveBeneficio {
  @PrimaryGeneratedColumn()
  id_beneficio: number;

  @Column({ length: 2 })
  @IsString()
  @IsNotEmpty()
  cve_dependencia: string;

  @Column({ length: 5 })
  @IsString()
  @IsNotEmpty()
  cve_institucion: string;

  @Column({ length: 4 })
  @IsString()
  @IsNotEmpty()
  cve_programa: string;

  @Column({ length: 2 })
  @IsString()
  @IsNotEmpty()
  cve_intra_programa: string;

  @Column({ type: 'numeric', precision: 2 })
  @IsNumber()
  @IsNotEmpty()
  cve_ent_fed: number;

  @Column({ length: 3 })
  @IsString()
  @IsNotEmpty()
  cve_municipio: string;

  @Column({ length: 4 })
  @IsString()
  @IsNotEmpty()
  cve_localidad: string;

  @Column({ length: 8 })
  @IsString()
  @IsNotEmpty()
  fecha_beneficio: string;

  @Column({ length: 2 })
  @IsString()
  @IsNotEmpty()
  cve_tipo_beneficiario: string;

  @Column({ length: 3 })
  @IsString()
  @IsNotEmpty()
  cve_tipo_beneficio: string;

  @Column({ type: 'numeric', precision: 16, scale: 2 })
  @IsNumber()
  @IsNotEmpty()
  cantidad_apoyo: number;

  @ManyToOne(() => InjuveBeneficiario, beneficiario => beneficiario.beneficios)
  @JoinColumn({ name: 'id_beneficiario_injuve' })
  beneficiario: InjuveBeneficiario;
}