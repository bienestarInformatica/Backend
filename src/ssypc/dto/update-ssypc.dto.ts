import { PartialType } from '@nestjs/swagger'
import { CreateSsypcBeneficiarioDto } from './create-ssypc-beneficiario.dto';

export class UpdateSsypcDto extends PartialType(CreateSsypcBeneficiarioDto) {}
