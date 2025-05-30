import { UpdateTuxpanBeneficioDto } from "./update-tuxpan-beneficio.dto";
import { UpdateTuxpanDomicilioDto } from "./update-tuxpan-domicilio.dto";
import { UpdateTuxpanDto } from "./update-tuxpan.dto";

export class UpdateTuxpanCompletoDto {
    beneficiario: UpdateTuxpanDto;
    beneficio: UpdateTuxpanBeneficioDto;
    domicilio: UpdateTuxpanDomicilioDto;
}