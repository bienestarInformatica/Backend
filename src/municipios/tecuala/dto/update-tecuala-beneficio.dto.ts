import { PartialType } from "@nestjs/mapped-types";
import { CreateTecualaBeneficioDto } from "./create-tecuala-beneficio.dto";

export class UpdateTecualaBeneficioDto extends PartialType(CreateTecualaBeneficioDto){}