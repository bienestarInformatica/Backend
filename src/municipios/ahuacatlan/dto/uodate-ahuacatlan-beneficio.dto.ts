import { PartialType } from "@nestjs/mapped-types";
import { CreateAhuacatlanBeneficioDto } from "./create-ahuacatlan-beneficio.dto";

export class UpdateAhuacatlanBeneficioDto extends PartialType(CreateAhuacatlanBeneficioDto) {}