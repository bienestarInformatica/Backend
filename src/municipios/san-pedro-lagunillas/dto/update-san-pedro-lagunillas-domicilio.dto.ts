import { PartialType } from "@nestjs/mapped-types";
import { CreateSanPedroLagunillasDomicilioDto } from "./create-san-pedro-lagunillas-domicilio.dto";

export class UpdateSanPedroLagunillasDomicilioDto extends PartialType(CreateSanPedroLagunillasDomicilioDto){}