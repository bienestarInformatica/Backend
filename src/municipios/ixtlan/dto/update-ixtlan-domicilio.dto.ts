import { PartialType } from "@nestjs/mapped-types";
import { CreateIxtlanDomicilioDto } from "./create-ixtlan-domicilio.dto";

export class UpdateIxtlanDomicilioDto extends PartialType(CreateIxtlanDomicilioDto) {
  // Aquí puedes agregar propiedades adicionales si es necesario
}