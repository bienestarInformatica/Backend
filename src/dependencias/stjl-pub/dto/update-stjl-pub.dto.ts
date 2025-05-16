import { PartialType } from '@nestjs/swagger';
import { CreateStjlBeneficiarioDto } from './create-stjl-beneficiario.dto';

export class UpdateStjlPubDto extends PartialType(CreateStjlBeneficiarioDto) {}
