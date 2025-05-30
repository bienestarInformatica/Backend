import { PartialType } from "@nestjs/mapped-types";
import { CreateNayarDomicilioDto } from "./create-nayar-domicilio.dto";

export class UpdateNayarDomicilioDto extends PartialType(CreateNayarDomicilioDto) {
  // Aquí puedes agregar propiedades adicionales si es necesario
}