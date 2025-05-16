import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TuxpanBeneficio } from './tuxpan-beneficio.entity';
import { TuxpanDomicilioBeneficiario } from './tuxpan-domicilio.entity';

@Entity('beneficiario_tuxpan')
export class TuxpanBeneficiario {
    @PrimaryGeneratedColumn()
    id_beneficiario_tuxpan: number;

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

    @OneToMany(() => TuxpanBeneficio, beneficio => beneficio.beneficiario)
    beneficios: TuxpanBeneficio[];

    @OneToMany(() => TuxpanDomicilioBeneficiario, domicilio => domicilio.beneficiario)
    domicilios: TuxpanDomicilioBeneficiario[];
}
