import { PartialType } from '@nestjs/swagger';
import { CreateIprovinayBeneficiarioDto } from './create-iprovinay-beneficiario.dto';

export class UpdateIprovinayPubDto extends PartialType(CreateIprovinayBeneficiarioDto) {}
