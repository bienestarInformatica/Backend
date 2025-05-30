import { PartialType } from "@nestjs/mapped-types";
import { CreateCompostelaDomicilioDto } from "./create-compostela-domicilio.dto";

export class UpdateCompostelaDomicilioDto extends PartialType(CreateCompostelaDomicilioDto) {
  // Aquí puedes agregar propiedades adicionales si es necesario
}