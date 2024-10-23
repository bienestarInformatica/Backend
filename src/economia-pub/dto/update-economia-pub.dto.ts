import { PartialType } from '@nestjs/swagger';
import { CreateEconomiaBeneficiarioDto } from './create-economia-beneficiario.dto';

export class UpdateEconomiaPubDto extends PartialType(CreateEconomiaBeneficiarioDto) {}
