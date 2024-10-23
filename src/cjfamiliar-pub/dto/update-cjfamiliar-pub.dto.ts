import { PartialType } from '@nestjs/swagger';
import { CreateCjfamiliarBeneficiarioDto } from './create-cjfamiliar-beneficiario.dto';

export class UpdateCjfamiliarPubDto extends PartialType(CreateCjfamiliarBeneficiarioDto) {}
