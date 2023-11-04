import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Medicine } from './schemas/medicine.schema';
import { MedicinesService } from './medicines.service';

@Controller('medicines')
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) {}

  @Get(':ID')
  async getMedicine(
    @Param('ID') ID: string,
  ): Promise<Medicine | HttpException> {
    try {
      const medicine = await this.medicinesService.getMedicineById(ID);
      return medicine;
    } catch (error) {
      // Handle and return appropriate error response
      return new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getMedicines(): Promise<Medicine[]> {
    return this.medicinesService.getMedicines();
  }

  @Post()
  async createMedicine(@Body() createMedicineDto: Medicine): Promise<Medicine> {
    return this.medicinesService.createMedicine(createMedicineDto);
  }

  @Patch(':ID')
  async updateMedicine(
    @Param('ID') ID: string,
    @Body() updateMedicine: Medicine,
  ): Promise<Medicine | HttpException> {
    try {
      const updatedMedicine = {
        ...updateMedicine,
        entityType: 'medicine',
        ID: ID,
      };
      await this.medicinesService.updateMedicine(ID, updatedMedicine);

      return updatedMedicine;
    } catch (error) {
      // Handle and return appropriate error response
      return new HttpException(
        'Failed to update patient',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':ID')
  async deleteMedicine(@Param('ID') ID: string) {
    return this.medicinesService.deleteMedicine(ID);
  }
}
