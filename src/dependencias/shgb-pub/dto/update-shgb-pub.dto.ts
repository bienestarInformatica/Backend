import { PartialType } from '@nestjs/swagger';
import { CreateShgbBeneficiarioDto } from './create-shgb-beneficiario.dto';

export class UpdateShgbPubDto extends PartialType(CreateShgbBeneficiarioDto) {}
