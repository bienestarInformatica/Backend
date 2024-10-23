import { PartialType } from '@nestjs/swagger';
import { CreateSemoviBeneficiarioDto } from './create-semovi-beneficiario.dto';

export class UpdateSemoviPubDto extends PartialType(CreateSemoviBeneficiarioDto) {}
