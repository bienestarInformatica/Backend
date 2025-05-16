import { PartialType } from '@nestjs/mapped-types';
import { CreateSantaMariaOroBeneficiarioDto } from './create-santa-maria-oro-beneficiario.dto';

export class UpdateSantaMariaOroDto extends PartialType(CreateSantaMariaOroBeneficiarioDto) {}
