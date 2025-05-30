import { PartialType } from "@nestjs/mapped-types";
import { CreateIxtlanBeneficioDto } from "./create-ixtlan-beneficio.dto";

export class UpdateIxtlanBeneficioDto extends PartialType(CreateIxtlanBeneficioDto) {
  // Aquí puedes agregar propiedades adicionales si es necesario
}