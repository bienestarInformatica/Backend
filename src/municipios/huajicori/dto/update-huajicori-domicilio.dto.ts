import { PartialType } from "@nestjs/mapped-types";
import { CreateHuajicoriDomicilioDto } from "./create-huajicori-domicilio.dto";

export class UpdateHuajicoriDomicilioDto extends PartialType(CreateHuajicoriDomicilioDto) {
  // Aquí puedes agregar propiedades adicionales si es necesario
}