import { PartialType } from "@nestjs/mapped-types";
import { CreateSantaMariaOroDomicilioDto } from "./create-santa-maria-oro-domicilio.dto";

export class UpdateSantaMariaOroDomicilioDto extends PartialType(CreateSantaMariaOroDomicilioDto){}