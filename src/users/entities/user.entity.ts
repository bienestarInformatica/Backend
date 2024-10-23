import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Role } from "../../common/enums/rol.enum";
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
    
    @PrimaryGeneratedColumn()
    id_user: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsString()
    @IsOptional()
    lastname: string;

    @Column({ unique: true, nullable: false})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column({ nullable: false, select: false})
    @IsNotEmpty()
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.ADMIN })
    role: Role;

    @Column({ length: 15, nullable: true })
    @IsString()
    number: string;

    @Column({ length: 50, default: 'sebien' })
    @IsString()
    dependencia: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @IsDate()
    date_create: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    @IsDate()
    date_update: Date;

    @Column({ default: true })
    @IsBoolean()
    state: boolean;

    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    photo_perfil: string;

    @Column({ nullable: true })
    @IsOptional()
    @IsDate()
    last_session: Date;

    @DeleteDateColumn()
    deleteAt: Date;
}
