import { PartialType } from '@nestjs/mapped-types';
import { CreateAmatlanBeneficiarioDto } from './create-amatlan-beneficiario.dto';

export class UpdateAmatlanDto extends PartialType(CreateAmatlanBeneficiarioDto) {}
