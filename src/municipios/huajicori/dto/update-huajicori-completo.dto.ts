import { UpdateHuajicoriBeneficioDto } from "./update-huajicori-beneficio.dto";
import { UpdateHuajicoriDomicilioDto } from "./update-huajicori-domicilio.dto";
import { UpdateHuajicoriDto } from "./update-huajicori.dto";

export class UpdateHuajicoriCompletoDto {
    beneficiario: UpdateHuajicoriDto;
    beneficio: UpdateHuajicoriBeneficioDto;
    domicilio: UpdateHuajicoriDomicilioDto;
}