import { PartialType } from '@nestjs/mapped-types';
import { CreateXaliscoBeneficiarioDto } from './create-xalisco-beneficiario.dto';

export class UpdateXaliscoDto extends PartialType(CreateXaliscoBeneficiarioDto) {}
