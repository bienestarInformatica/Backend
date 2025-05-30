import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SanPedroLagunillasService } from './san-pedro-lagunillas.service';
import { CreateSanPedroLagunillasBeneficiarioDto } from './dto/create-san-pedro-lagunillas-beneficiario.dto';
import { CreateSanPedroLagunillasBeneficioDto } from './dto/create-san-pedro-lagunillas-beneficio.dto';
import { CreateSanPedroLagunillasDomicilioDto } from './dto/create-san-pedro-lagunillas-domicilio.dto';
import { UpdateSanPedroLagunillasCompletoDto } from './dto/update-san-pedro-lagunillas-completo.dto';

@Controller('san-pedro-lagunillas')
export class SanPedroLagunillasController {
  constructor(private readonly sanPedroLagunillasService: SanPedroLagunillasService) {}

 @Post()
   async createWithRelation(
     @Body() createBeneficiarioDto: CreateSanPedroLagunillasBeneficiarioDto,
     @Body() createBeneficioDto: CreateSanPedroLagunillasBeneficioDto,
     @Body() createDomicilioDto: CreateSanPedroLagunillasDomicilioDto,
   ): Promise<any> {
     return await this.sanPedroLagunillasService.createWithRelation(
       createBeneficiarioDto,
       createBeneficioDto,
       createDomicilioDto,
     );
   }
 
   @Post('post-excel')
   async importarExcel(
     @Body() beneficiarios: CreateSanPedroLagunillasBeneficiarioDto[],
     @Body() beneficios: CreateSanPedroLagunillasBeneficioDto[],
     @Body() domicilios: CreateSanPedroLagunillasDomicilioDto[],
   ) {
     try {
       const resultados = await this.sanPedroLagunillasService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
       return resultados;
     } catch (error) {
       console.error('Error al importar desde Excel:', error);
       throw error;
     }
   }
 
   @Get('all')
   // @Auth(Role.OPERATIVO)
   async findAll(): Promise<any> {
     return this.sanPedroLagunillasService.findAllWithRelations();
   }
 
   @Patch(':id')
   update(@Param('id') id: string, @Body() updateSanPedroLagunillasCompletoDto: UpdateSanPedroLagunillasCompletoDto) {
     return this.sanPedroLagunillasService.update(+id, updateSanPedroLagunillasCompletoDto);
   }
 
   @Delete(':id')
   remove(@Param('id') id: string) {
     return this.sanPedroLagunillasService.remove(+id);
   }
}
