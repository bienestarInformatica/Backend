import { PartialType } from "@nestjs/mapped-types";
import { CreateRosamoradaDomicilioDto } from "./create-rosamorada-domicilio.dto";

export class UpdateRosamoradaDomicilioDto extends PartialType(CreateRosamoradaDomicilioDto) {
  // Aquí puedes agregar propiedades adicionales si es necesario
}