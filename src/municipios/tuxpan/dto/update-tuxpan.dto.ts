import { PartialType } from '@nestjs/mapped-types';
import { CreateTuxpanBeneficiarioDto } from './create-tuxpan-beneficiario.dto';

export class UpdateTuxpanDto extends PartialType(CreateTuxpanBeneficiarioDto) {}
