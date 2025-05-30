import { UpdateAcaponetaBeneficioDto } from "./update-acaponeta-beneficio.dto";
import { UpdateAcaponetaDomicilioDto } from "./update-acaponeta-domicilio.dto";
import { UpdateAcaponetaDto } from "./update-acaponeta.dto";

export class UpdateAcaponetaCompletoDto {
  beneficiario: UpdateAcaponetaDto;
  beneficio: UpdateAcaponetaBeneficioDto;
  domicilio: UpdateAcaponetaDomicilioDto;
}