import { UpdateAhuacatlanBeneficioDto } from "./uodate-ahuacatlan-beneficio.dto";
import { UpdateAhuacatlanDomicilioDto } from "./update-ahuacatlan-domicilio.dto";
import { UpdateAhuacatlanDto } from "./update-ahuacatlan.dto";

export class UpdateAhuacatlanCompletoDto {
  beneficiario: UpdateAhuacatlanDto;
  beneficio: UpdateAhuacatlanBeneficioDto;
  domicilio: UpdateAhuacatlanDomicilioDto;
}