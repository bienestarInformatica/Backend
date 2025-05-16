import { PartialType } from '@nestjs/mapped-types';
import { CreateRuizBeneficiarioDto } from './create-ruiz-beneficiario.dto';

export class UpdateRuizDto extends PartialType(CreateRuizBeneficiarioDto) {}
