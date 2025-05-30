import { PartialType } from "@nestjs/mapped-types";
import { CreateRuizBeneficioDto } from "./create-ruiz-beneficio.dto";

export class UpdateRuizBeneficioDto extends PartialType(CreateRuizBeneficioDto) {}