import { UpdateXaliscoBeneficioDto } from "./update-xalisco-beneficio.dto";
import { UpdateXaliscoDomicilioDto } from "./update-xalisco-domicilio.dto";
import { UpdateXaliscoDto } from "./update-xalisco.dto";

export class UpdateXaliscoCompletoDto {
    beneficiario: UpdateXaliscoDto; 
    beneficio: UpdateXaliscoBeneficioDto; 
    domicilio: UpdateXaliscoDomicilioDto;
}