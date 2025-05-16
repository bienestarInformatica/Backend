import { PartialType } from '@nestjs/mapped-types';
import { CreateRosamoradaBeneficiarioDto } from './create-rosamorada-beneficiario.dto';

export class UpdateRosamoradaDto extends PartialType(CreateRosamoradaBeneficiarioDto) {}
