import { PartialType } from '@nestjs/swagger';
import { CreateInjuveBeneficiarioDto } from './create-injuve-beneficiario.dto';

export class UpdateInjuvePubDto extends PartialType(CreateInjuveBeneficiarioDto) {}
