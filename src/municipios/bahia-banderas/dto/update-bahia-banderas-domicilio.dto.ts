import { PartialType } from "@nestjs/mapped-types";
import { CreateBahiaDomicilioDto } from "./create-bahia-banderas-domicilio.dto";

export class UpdateBahiaDomicilioDto extends PartialType(CreateBahiaDomicilioDto) {
  // Aquí puedes agregar propiedades adicionales si es necesario
}