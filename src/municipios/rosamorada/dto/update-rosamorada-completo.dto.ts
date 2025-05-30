import { UpdateRosamoradaBeneficioDto } from "./update-rosamorada-beneficio.dto";
import { UpdateRosamoradaDomicilioDto } from "./update-rosamorada-domicilio.dto";
import { UpdateRosamoradaDto } from "./update-rosamorada.dto";

export class UpdateRosamoradaCompletoDto {
    beneficiario: UpdateRosamoradaDto;
    beneficio: UpdateRosamoradaBeneficioDto; 
    domicilio: UpdateRosamoradaDomicilioDto; 
}