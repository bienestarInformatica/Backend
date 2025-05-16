import { PartialType } from '@nestjs/swagger';
import { CreateCocytenBeneficiarioDto } from './create-cocyten-beneficiario.dto';

export class UpdateCocytenPubDto extends PartialType(CreateCocytenBeneficiarioDto) {}
