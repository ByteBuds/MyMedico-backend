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
import { CreateDoctorDto } from './dto/create-user.dto';
import { UpdateDoctorDto } from './dto/update-user.dto';
import { Doctor } from './schemas/doctor.schema';
import { DoctorsService } from './doctors.service';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get(':ID')
  async getDoctor(@Param('ID') ID: string): Promise<Doctor | HttpException> {
    try {
      const doctor = await this.doctorsService.getDoctorById(ID);
      return doctor;
    } catch (error) {
      // Handle and return appropriate error response
      return new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getDoctors(): Promise<Doctor[]> {
    return this.doctorsService.getDoctors();
  }

  @Post()
  async createDoctor(
    @Body() createDoctorDto: CreateDoctorDto,
  ): Promise<Doctor> {
    return this.doctorsService.createDoctor(createDoctorDto);
  }

  @Patch(':ID')
  async updateDoctor(
    @Param('ID') ID: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ): Promise<Doctor | HttpException> {
    try {
      const updatedDoctor = await this.doctorsService.updateDoctor(
        ID,
        updateDoctorDto,
      );

      return updatedDoctor;
    } catch (error) {
      // Handle and return appropriate error response
      return new HttpException(
        'Failed to update doctor',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':ID')
  async deleteDoctor(@Param('ID') ID: string) {
    return this.doctorsService.deleteDoctor(ID);
  }
}
