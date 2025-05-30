import { UpdateTecualaBeneficioDto } from "./update-tecuala-beneficio.dto";
import { UpdateTecualaDomicilioDto } from "./update-tecuala-domicilio.dto";
import { UpdateTecualaDto } from "./update-tecuala.dto";

export class UpdateTecualaCompletoDto {
    beneficiario: UpdateTecualaDto; 
    beneficio: UpdateTecualaBeneficioDto; 
    domicilio: UpdateTecualaDomicilioDto; 
}