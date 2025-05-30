import { PartialType } from "@nestjs/mapped-types";
import { CreateTecualaDomicilioDto } from "./create-tecuala-domicilio.dto";

export class UpdateTecualaDomicilioDto extends PartialType(CreateTecualaDomicilioDto){}