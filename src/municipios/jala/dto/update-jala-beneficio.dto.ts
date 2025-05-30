import { PartialType } from '@nestjs/mapped-types';
import { CreateJalaBeneficioDto } from './create-jala-beneficio.dto';

export class UpdateJalaBeneficioDto extends PartialType(CreateJalaBeneficioDto) {}
