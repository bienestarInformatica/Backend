import { PartialType } from "@nestjs/mapped-types";
import { CreateXaliscoDomicilioDto } from "./create-xalisco-domicilio.dto";

export class UpdateXaliscoDomicilioDto extends PartialType(CreateXaliscoDomicilioDto) {}