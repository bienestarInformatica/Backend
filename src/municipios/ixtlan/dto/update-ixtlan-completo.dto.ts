import { UpdateIxtlanBeneficioDto } from "./update-ixtlan-beneficio.dto";
import { UpdateIxtlanDomicilioDto } from "./update-ixtlan-domicilio.dto";
import { UpdateIxtlanDto } from "./update-ixtlan.dto";

export class UpdateIxtlanCompletoDto {
    beneficiario: UpdateIxtlanDto;
    beneficio: UpdateIxtlanBeneficioDto;
    domicilio: UpdateIxtlanDomicilioDto;
}