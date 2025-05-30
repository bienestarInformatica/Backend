import { PartialType } from '@nestjs/mapped-types';
import { CreateJalaDomicilioDto } from './create-jala-domicilio.dto';

export class UpdateJalaDomicilioDto extends PartialType(CreateJalaDomicilioDto) {}
