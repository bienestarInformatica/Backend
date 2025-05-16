import { PartialType } from '@nestjs/swagger';
import { CreateCecanBeneficiarioDto } from './create-cecan-beneficiario.dto';

export class UpdateCecanPubDto extends PartialType(CreateCecanBeneficiarioDto) {}
