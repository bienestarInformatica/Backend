import { PartialType } from "@nestjs/mapped-types";
import { CreateSanPedroLagunillasBeneficioDto } from "./create-san-pedro-lagunillas-beneficio.dto";

export class UpdateSanPedroLagunillasBeneficioDto extends PartialType(CreateSanPedroLagunillasBeneficioDto){}