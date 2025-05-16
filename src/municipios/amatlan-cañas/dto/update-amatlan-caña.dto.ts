import { PartialType } from '@nestjs/mapped-types';
import { CreateAmatlanBeneficiarioDto } from './create-amatlan-cañas-beneficiario.dto';

export class UpdateAmatlanCañaDto extends PartialType(CreateAmatlanBeneficiarioDto) {}
