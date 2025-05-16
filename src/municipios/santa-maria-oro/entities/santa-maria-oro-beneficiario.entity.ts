import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { SantaMariaOroBeneficio } from './santa-maria-oro-beneficio.entity';
import { SantaMariaOroDomicilioBeneficiario } from './santa-maria-oro-domicilio.entity';

@Entity('beneficiario_santamaria') // Nombre de la tabla en la base de datos
export class SantaMariaOroBeneficiario {
    @PrimaryGeneratedColumn()
    id_beneficiario_santamaria: number;

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

    @OneToMany(() => SantaMariaOroBeneficio, beneficio => beneficio.beneficiario)
    beneficios: SantaMariaOroBeneficio[];

    @OneToMany(() => SantaMariaOroDomicilioBeneficiario, domicilio => domicilio.beneficiario)
    domicilios: SantaMariaOroDomicilioBeneficiario[];
}
