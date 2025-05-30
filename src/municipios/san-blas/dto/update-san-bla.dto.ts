import { PartialType } from '@nestjs/mapped-types';
import { CreateSanBlasBeneficiarioDto } from './create-san-blas-beneficiario.dto';

export class UpdateSanBlasDto extends PartialType(CreateSanBlasBeneficiarioDto) {}
