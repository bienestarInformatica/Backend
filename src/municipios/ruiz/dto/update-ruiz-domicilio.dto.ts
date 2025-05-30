import { PartialType } from "@nestjs/mapped-types";
import { CreateRuizDomicilioDto } from "./create-ruiz-domicilio.dto";

export class UpdateRuizDomicilioDto extends PartialType(CreateRuizDomicilioDto) {
  // Aquí puedes agregar propiedades adicionales si es necesario
}