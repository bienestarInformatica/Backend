import { PartialType } from '@nestjs/mapped-types';
import { CreateIxtlanBeneficiarioDto } from './create-ixtlan-beneficiario.dto';

export class UpdateIxtlanDto extends PartialType(CreateIxtlanBeneficiarioDto) {}
