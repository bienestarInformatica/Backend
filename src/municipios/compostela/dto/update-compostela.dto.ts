import { PartialType } from '@nestjs/mapped-types';
import { CreateCompostelaBeneficiarioDto } from './create-compostela-beneficiario.dto';

export class UpdateCompostelaDto extends PartialType(CreateCompostelaBeneficiarioDto) {}
