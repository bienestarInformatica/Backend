import { PartialType } from '@nestjs/mapped-types';
import { CreateSanPedroLagunillasBeneficiarioDto } from './create-san-pedro-lagunillas-beneficiario.dto';

export class UpdateSanPedroLagunillaDto extends PartialType(CreateSanPedroLagunillasBeneficiarioDto) {}
