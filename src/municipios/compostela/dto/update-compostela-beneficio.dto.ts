import { PartialType } from "@nestjs/mapped-types";
import { CreateCompostelaBeneficioDto } from "./create-compostela-beneficio.dto";

export class UpdateCompostelaBeneficioDto extends PartialType(CreateCompostelaBeneficioDto) {
  // Aquí puedes agregar propiedades adicionales si es necesario
}