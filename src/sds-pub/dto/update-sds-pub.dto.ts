import { PartialType } from '@nestjs/swagger';
import { CreateSdsBeneficiarioDto } from './create-sds-beneficiario.dto';

export class UpdateSdsPubDto extends PartialType(CreateSdsBeneficiarioDto) {}
