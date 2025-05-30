import { PartialType } from "@nestjs/mapped-types";
import { CreateNayarBeneficioDto } from "./create-nayar-beneficio.dto";

export class UpdateNayarBeneficioDto extends PartialType(CreateNayarBeneficioDto) {
  // Aquí puedes agregar propiedades adicionales si es necesario
}