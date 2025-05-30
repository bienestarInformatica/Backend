import { PartialType } from "@nestjs/mapped-types";
import { CreateRosamoradaBeneficioDto } from "./create-rosamorada-beneficio.dto";

export class UpdateRosamoradaBeneficioDto extends PartialType(CreateRosamoradaBeneficioDto) {
  // Aquí puedes agregar propiedades adicionales si es necesario
}