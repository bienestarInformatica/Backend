import { PartialType } from '@nestjs/swagger';
import { CreateSebienBeneficiarioDto } from './create-sebien-beneficiario.dto';

export class UpdateSebienPubDto extends PartialType(CreateSebienBeneficiarioDto) {}
