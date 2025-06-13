import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/common/enums/rol.enum';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async register({ name, lastname, email, password, role, number, dependencia }: RegisterDto) {

        //comprobar si es un correo valido
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new BadRequestException('El correo no es valido');
        }


        const user = await this.usersService.findOneByEmail(email);
        if (user) {
            throw new BadRequestException('el usuario ya existe');
        }
        await this.usersService.create({
            name,
            lastname,
            email,
            password: await bcrypt.hash(password, 10),
            role,
            number,
            dependencia,
        })
        return {
            name,
            email,
        }
    }

    async login({ email, password }: LoginDto) {
        const user = await this.usersService.findOneByEmailWithPassword(email);
        if (!user) {
            throw new UnauthorizedException('Email incorrecto');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Contraseña incorrecta');
        }
        const payload: { email: string; role: string; dependencia?: string } = {
            email: user.email,
            role: user.role,
        };
        if (user.dependencia) {
            payload.dependencia = user.dependencia;
        }
        const token = await this.jwtService.signAsync(payload);
        return {
            token,
            email: user.email,
            dependencia: user.dependencia || null,
            role: user.role,
        };
    }

    async profile({ email, role }: { email: string, role: string }) {
        // if(role !== 'admin'){
        //     throw new UnauthorizedException('You are not authorized to access');
        // }
        return await this.usersService.findOneByEmail(email);
    }
}
