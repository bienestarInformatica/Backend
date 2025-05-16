import { PartialType } from '@nestjs/mapped-types';
import { CreateTepicBeneficiarioDto } from './create-tepic-beneficiario.dto';

export class UpdateTepicDto extends PartialType(CreateTepicBeneficiarioDto) {}
