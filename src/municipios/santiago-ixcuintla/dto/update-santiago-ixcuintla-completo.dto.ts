import { UpdateSantiagoIxcuintlaBeneficioDto } from "./update-santiago-ixcuintla-beneficio.dto";
import { UpdateSantiagoIxcuintlaDomicilioDto } from "./update-santiago-ixcuintla-domicilio.dto";
import { UpdateSantiagoIxcuintlaDto } from "./update-santiago-ixcuintla.dto";

export class UpdateSantiagoIxcuintlaCompletoDto {
    beneficiario: UpdateSantiagoIxcuintlaDto;
    beneficio: UpdateSantiagoIxcuintlaBeneficioDto;
    domicilio: UpdateSantiagoIxcuintlaDomicilioDto;
}