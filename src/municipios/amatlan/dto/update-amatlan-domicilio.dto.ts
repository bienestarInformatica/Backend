import { PartialType } from "@nestjs/mapped-types";
import { CreateAmatlanDomicilioDto } from "./create-amatlan-domicilio.dto";

export class UpdateAmatlanDomicilioDto extends PartialType(CreateAmatlanDomicilioDto) {}