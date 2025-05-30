import { UpdateSanPedroLagunillasDto } from "./update-san-pedro-lagunilla.dto";
import { UpdateSanPedroLagunillasBeneficioDto } from "./update-san-pedro-lagunillas-beneficio.dto";
import { UpdateSanPedroLagunillasDomicilioDto } from "./update-san-pedro-lagunillas-domicilio.dto";

export class UpdateSanPedroLagunillasCompletoDto {
    beneficiario: UpdateSanPedroLagunillasDto;
    beneficio: UpdateSanPedroLagunillasBeneficioDto;
    domicilio: UpdateSanPedroLagunillasDomicilioDto;
}