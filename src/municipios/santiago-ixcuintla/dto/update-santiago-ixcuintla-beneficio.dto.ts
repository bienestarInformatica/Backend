import { PartialType } from "@nestjs/mapped-types";
import { CreateSantiagoIxcuintlaBeneficioDto } from "./create-santiago-ixcuintla-beneficio.dto";

export class UpdateSantiagoIxcuintlaBeneficioDto extends PartialType(CreateSantiagoIxcuintlaBeneficioDto){}