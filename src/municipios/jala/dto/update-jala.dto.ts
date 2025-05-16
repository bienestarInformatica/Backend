import { PartialType } from '@nestjs/mapped-types';
import { CreateJalaBeneficiarioDto } from './create-jala-beneficiario.dto';

export class UpdateJalaDto extends PartialType(CreateJalaBeneficiarioDto) {}
