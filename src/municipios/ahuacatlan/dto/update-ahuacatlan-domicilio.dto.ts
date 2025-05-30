import { PartialType } from "@nestjs/mapped-types";
import { CreateAhuacatlanDomicilioDto } from "./create-ahuacatlan-domicilio.dto";

export class UpdateAhuacatlanDomicilioDto extends PartialType(CreateAhuacatlanDomicilioDto) {}