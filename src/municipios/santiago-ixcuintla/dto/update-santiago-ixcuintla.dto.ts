import { PartialType } from '@nestjs/mapped-types';
import { CreateSantiagoIxcuintlaBeneficiarioDto } from './create-santiago-ixcuintla-beneficiario.dto';

export class UpdateSantiagoIxcuintlaDto extends PartialType(CreateSantiagoIxcuintlaBeneficiarioDto) {}
