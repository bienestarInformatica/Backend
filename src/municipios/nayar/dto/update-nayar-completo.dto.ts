import { UpdateNayarBeneficioDto } from "./update-nayar-beneficio.dto";
import { UpdateNayarDomicilioDto } from "./update-nayar-domicilio.dto";
import { UpdateNayarDto } from "./update-nayar.dto";

export class UpdateNayarCompletoDto {
    beneficiario: UpdateNayarDto;
    beneficio: UpdateNayarBeneficioDto;
    domicilio: UpdateNayarDomicilioDto;
}