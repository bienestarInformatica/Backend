import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";
import { Role } from "src/common/enums/rol.enum";

export class RegisterDto{
    
    @IsString()
    name: string;

    @IsString()
    lastname: string;
    
    @IsEmail()
    email: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    password: string;

    @IsString()
    role: Role;

    @IsString()
    number: string;

    @IsString()
    dependencia: string;
}