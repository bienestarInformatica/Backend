import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { RosamoradaBeneficio } from './rosamorada-beneficio.entity';
import { RosamoradaDomicilioBeneficiario } from './rosamorada-domicilio.entity';

@Entity('beneficiario_rosamorada') // Nombre de la tabla en la base de datos
export class RosamoradaBeneficiario {
    @PrimaryGeneratedColumn()
    id_beneficiario_rosamorada: number;

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

    @Column({ type: 'boolean' })
    @IsBoolean()
    @IsNotEmpty()
    es_valido: boolean;

    @OneToMany(() => RosamoradaBeneficio, beneficio => beneficio.beneficiario)
    beneficios: RosamoradaBeneficio[];

    @OneToMany(() => RosamoradaDomicilioBeneficiario, domicilio => domicilio.beneficiario)
    domicilios: RosamoradaDomicilioBeneficiario[];
}
