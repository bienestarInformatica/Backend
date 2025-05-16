import { PartialType } from '@nestjs/mapped-types';
import { CreateNayarBeneficiarioDto } from './create-nayar-beneficiario.dto';

export class UpdateNayarDto extends PartialType(CreateNayarBeneficiarioDto) {}
