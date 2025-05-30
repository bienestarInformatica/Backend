import { PartialType } from "@nestjs/mapped-types";
import { CreateTuxpanBeneficioDto } from "./create-tuxpan-beneficio.dto";

export class UpdateTuxpanBeneficioDto extends PartialType(CreateTuxpanBeneficioDto){}