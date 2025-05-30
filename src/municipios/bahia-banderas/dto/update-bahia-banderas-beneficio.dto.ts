import { PartialType } from "@nestjs/mapped-types";
import { CreateBahiaBeneficioDto } from "./create-bahia-banderas-beneficio.dto";

export class UpdateBahiaBeneficioDto extends PartialType(CreateBahiaBeneficioDto) {
  // Aquí puedes agregar propiedades adicionales si es necesario
}