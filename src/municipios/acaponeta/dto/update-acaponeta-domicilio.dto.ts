import { PartialType } from "@nestjs/mapped-types";
import { CreateAcaponetaDomicilioDto } from "./create-acaponeta-domicilio.dto";

export class UpdateAcaponetaDomicilioDto extends PartialType(CreateAcaponetaDomicilioDto) {}