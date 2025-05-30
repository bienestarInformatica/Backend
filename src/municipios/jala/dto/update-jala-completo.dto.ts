import { UpdateJalaDto } from './update-jala.dto';
import { UpdateJalaBeneficioDto } from './update-jala-beneficio.dto';
import { UpdateJalaDomicilioDto } from './update-jala-domicilio.dto';

export class UpdateJalaCompletoDto {
  beneficiario: UpdateJalaDto;
  beneficio: UpdateJalaBeneficioDto;
  domicilio: UpdateJalaDomicilioDto;
}