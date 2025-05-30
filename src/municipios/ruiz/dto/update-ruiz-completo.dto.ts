import { UpdateRuizBeneficioDto } from "./update-ruiz-beneficio.dto";
import { UpdateRuizDomicilioDto } from "./update-ruiz-domicilio.dto";
import { UpdateRuizDto } from "./update-ruiz.dto";

export class UpdateRuizCompletoDto {
    beneficiario: UpdateRuizDto;
    beneficio: UpdateRuizBeneficioDto;
    domicilio: UpdateRuizDomicilioDto;
}