import { PartialType } from "@nestjs/mapped-types";
import { CreateAcaponetaBeneficioDto } from "./create-acaponeta-beneficio.dto";


export class UpdateAcaponetaBeneficioDto extends PartialType(CreateAcaponetaBeneficioDto) {}