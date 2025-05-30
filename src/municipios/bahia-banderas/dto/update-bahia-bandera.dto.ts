import { PartialType } from '@nestjs/mapped-types';
import { CreateBahiaBeneficiarioDto } from './create-bahia-banderas-beneficiario.dto';

export class UpdateBahiaDto extends PartialType(CreateBahiaBeneficiarioDto) {}
