import { UpdateAmatlanBeneficioDto } from "./update-amatlan-beneficio.dto";
import { UpdateAmatlanDomicilioDto } from "./update-amatlan-domicilio.dto";
import { UpdateAmatlanDto } from "./update-amatlan.dto";

export class UpdateAmatlanCompletoDto {
    beneficiario: UpdateAmatlanDto;
    beneficio: UpdateAmatlanBeneficioDto;
    domicilio: UpdateAmatlanDomicilioDto;
}