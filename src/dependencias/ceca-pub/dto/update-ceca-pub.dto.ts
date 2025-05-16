import { PartialType } from '@nestjs/swagger';
import { CreateCecaBeneficiarioDto } from './create-ceca-beneficiario.dto';

export class UpdateCecaPubDto extends PartialType(CreateCecaBeneficiarioDto) {}
