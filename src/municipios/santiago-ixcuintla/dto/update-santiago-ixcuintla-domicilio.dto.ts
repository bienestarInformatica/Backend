import { PartialType } from "@nestjs/mapped-types";
import { CreateSantiagoIxcuintlaDomicilioDto } from "./create-santiago-ixcuintla-domicilio.dto";

export class UpdateSantiagoIxcuintlaDomicilioDto extends PartialType(CreateSantiagoIxcuintlaDomicilioDto){}