import { PartialType } from '@nestjs/mapped-types';
import { CreateAcaponetaBeneficiarioDto } from './create-acaponeta-beneficiario.dto';

export class UpdateAcaponetaDto extends PartialType(CreateAcaponetaBeneficiarioDto) {}
