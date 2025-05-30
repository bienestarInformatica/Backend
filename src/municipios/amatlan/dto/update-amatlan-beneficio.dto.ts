import { PartialType } from "@nestjs/mapped-types";
import { CreateAmatlanBeneficioDto } from "./create-amatlan-beneficio.dto";

export class UpdateAmatlanBeneficioDto extends PartialType(CreateAmatlanBeneficioDto) {}