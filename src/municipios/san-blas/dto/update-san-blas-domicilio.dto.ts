import { PartialType } from "@nestjs/mapped-types";
import { CreateSanBlasDomicilioDto } from "./create-san-blas-domicilio.dto";

export class UpdateSanBlasDomicilioDto extends PartialType(CreateSanBlasDomicilioDto){}