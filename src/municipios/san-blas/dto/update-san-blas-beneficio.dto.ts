import { PartialType } from "@nestjs/mapped-types";
import { CreateSanBlasBeneficioDto } from "./create-san-blas-beneficio.dto";

export class UpdateSanBlasBeneficioDto extends PartialType(CreateSanBlasBeneficioDto){}