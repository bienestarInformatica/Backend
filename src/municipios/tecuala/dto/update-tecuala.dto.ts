import { PartialType } from '@nestjs/mapped-types';
import { CreateTecualaBeneficiarioDto } from './create-tecuala-beneficiario.dto';

export class UpdateTecualaDto extends PartialType(CreateTecualaBeneficiarioDto) {}
