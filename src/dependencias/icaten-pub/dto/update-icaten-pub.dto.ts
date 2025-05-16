import { PartialType } from '@nestjs/swagger';
import { CreateIcatenBeneficiarioDto } from './create-icaten-beneficiario.dto';

export class UpdateIcatenPubDto extends PartialType(CreateIcatenBeneficiarioDto) {}
