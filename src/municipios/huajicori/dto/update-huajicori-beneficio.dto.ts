import { PartialType } from "@nestjs/mapped-types";
import { CreateHuajicoriBeneficioDto } from "./create-huajicori-beneficio.dto";

export class UpdateHuajicoriBeneficioDto extends PartialType(CreateHuajicoriBeneficioDto) {
  // Aquí puedes agregar propiedades adicionales si es necesario
}