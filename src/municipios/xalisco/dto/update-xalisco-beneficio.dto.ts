import { PartialType } from "@nestjs/mapped-types";
import { CreateXaliscoBeneficioDto } from "./create-xalisco-beneficio.dto";

export class UpdateXaliscoBeneficioDto extends PartialType(CreateXaliscoBeneficioDto){}