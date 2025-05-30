import { CreateCompostelaBeneficiarioDto } from "./create-compostela-beneficiario.dto";
import { CreateCompostelaBeneficioDto } from "./create-compostela-beneficio.dto";
import { CreateCompostelaDomicilioDto } from "./create-compostela-domicilio.dto";

export class UpdateCompostelaCompletoDto {
    beneficiario: CreateCompostelaBeneficiarioDto;
    beneficio: CreateCompostelaBeneficioDto;
    domicilio: CreateCompostelaDomicilioDto;
}