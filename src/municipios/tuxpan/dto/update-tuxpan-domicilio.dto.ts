import { PartialType } from "@nestjs/mapped-types";
import { CreateTuxpanDomicilioDto } from "./create-tuxpan-domicilio.dto";

export class UpdateTuxpanDomicilioDto extends PartialType(CreateTuxpanDomicilioDto){}