import { Role } from "src/common/enums/rol.enum";

export class CreateUserDto {
    
    name: string;

    lastname: string;

    email: string;

    password: string;

    role: Role;

    number: string;

    dependencia: string;
}