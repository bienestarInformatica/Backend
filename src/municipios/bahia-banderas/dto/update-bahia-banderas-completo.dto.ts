import { UpdateBahiaDto } from "./update-bahia-bandera.dto";
import { UpdateBahiaBeneficioDto } from "./update-bahia-banderas-beneficio.dto";
import { UpdateBahiaDomicilioDto } from "./update-bahia-banderas-domicilio.dto";

export class UpdateBahiaCompletoDto {
    beneficiario: UpdateBahiaDto;
    beneficio: UpdateBahiaBeneficioDto;
    domicilio: UpdateBahiaDomicilioDto;
}