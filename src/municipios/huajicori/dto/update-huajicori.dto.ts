import { PartialType } from '@nestjs/mapped-types';
import { CreateHuajicoriBeneficiarioDto } from './create-huajicori-beneficiario.dto';

export class UpdateHuajicoriDto extends PartialType(CreateHuajicoriBeneficiarioDto) {}
