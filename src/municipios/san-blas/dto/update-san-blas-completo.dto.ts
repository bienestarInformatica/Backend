import { UpdateSanBlasDto } from "./update-san-bla.dto";
import { UpdateSanBlasBeneficioDto } from "./update-san-blas-beneficio.dto";
import { UpdateSanBlasDomicilioDto } from "./update-san-blas-domicilio.dto";

export class UpdateSanBlasCompletoDto {
    beneficiario: UpdateSanBlasDto;
    beneficio: UpdateSanBlasBeneficioDto;
    domicilio: UpdateSanBlasDomicilioDto;
}