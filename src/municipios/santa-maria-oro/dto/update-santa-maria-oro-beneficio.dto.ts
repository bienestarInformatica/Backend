import { PartialType } from "@nestjs/mapped-types";
import { CreateSantaMariaOroBeneficioDto } from "./create-santa-maria-oro-beneficio.dto";

export class UpdateSantaMariaOroBeneficioDto extends PartialType(CreateSantaMariaOroBeneficioDto){}