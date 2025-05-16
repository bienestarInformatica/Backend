import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { SanBlasBeneficio } from './san-blas-beneficio.entity';
import { SanBlasDomicilioBeneficiario } from './san-blas.domicilio.entity';

@Entity('beneficiario_sanblas') // Nombre de la tabla en la base de datos
export class SanBlasBeneficiario {
    @PrimaryGeneratedColumn()
    id_beneficiario_sanblas: number;

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

    @OneToMany(() => SanBlasBeneficio, beneficio => beneficio.beneficiario)
    beneficios: SanBlasBeneficio[];

    @OneToMany(() => SanBlasDomicilioBeneficiario, domicilio => domicilio.beneficiario)
    domicilios: SanBlasDomicilioBeneficiario[];
}
