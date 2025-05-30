import { UpdateSantaMariaOroBeneficioDto } from "./update-santa-maria-oro-beneficio.dto";
import { UpdateSantaMariaOroDomicilioDto } from "./update-santa-maria-oro-domicilio.dto";
import { UpdateSantaMariaOroDto } from "./update-santa-maria-oro.dto";

export class UpdateSantaMariaOroCompletoDto {
    beneficiario: UpdateSantaMariaOroDto;
    beneficio: UpdateSantaMariaOroBeneficioDto;
    domicilio: UpdateSantaMariaOroDomicilioDto;
}