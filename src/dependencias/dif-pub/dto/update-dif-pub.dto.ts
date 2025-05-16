import { PartialType } from '@nestjs/swagger';
import { CreateDifBeneficiarioDto } from './create-dif-beneficiario.dto';

export class UpdateDifPubDto extends PartialType(CreateDifBeneficiarioDto) {}
