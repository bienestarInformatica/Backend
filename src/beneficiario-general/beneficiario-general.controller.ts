import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BeneficiarioGeneralService } from './beneficiario-general.service';

@Controller('beneficiario-general')
export class BeneficiarioGeneralController {
  constructor(private readonly beneficiarioGeneralService: BeneficiarioGeneralService) {}

  @Get()
  async obtenerBeneficiarios() {
    return this.beneficiarioGeneralService.obtenerBeneficiarios();
  }

  @Get('all')
  async obtenerBen() {
    return this.beneficiarioGeneralService.obtenerCecan();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beneficiarioGeneralService.findOne(+id);
  }
}
