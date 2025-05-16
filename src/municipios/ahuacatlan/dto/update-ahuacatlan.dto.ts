import { PartialType } from '@nestjs/mapped-types';
import { CreateAhuacatlanBeneficiarioDto } from './create-ahuacatlan-beneficiario.dto';

export class UpdateAhuacatlanDto extends PartialType(CreateAhuacatlanBeneficiarioDto) {}
