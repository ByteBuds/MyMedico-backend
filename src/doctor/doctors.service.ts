import { Doctor } from './schemas/doctor.schema';
import { DoctorsRepository } from './doctors.repository';
import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { UpdateDoctorDto } from './dto/update-user.dto';

@Injectable()
export class DoctorsService {
  constructor(private readonly doctorsRepository: DoctorsRepository) {}

  async getDoctorById(ID: string): Promise<Doctor | null> {
    try {
      const doctor = await this.doctorsRepository.findOne({ ID });
      if (!doctor) {
        throw new Error(`Doctor with ID ${ID} not found`);
      }
      return doctor;
    } catch (error) {
      throw new Error('Failed to fetch doctor'); // Handle other errors
    }
  }

  async getDoctors(): Promise<Doctor[]> {
    return this.doctorsRepository.find({});
  }

  async createDoctor(doctor: Doctor): Promise<Doctor> {
    return this.doctorsRepository.create({
      ...doctor,
      entityType: 'doctor',
      ID: uuid(),
    });
  }

  async updateDoctor(
    ID: string,
    doctorUpdates: UpdateDoctorDto,
  ): Promise<Doctor> {
    try {
      const updatedDoctor = await this.doctorsRepository.findOneAndUpdate(
        { ID },
        doctorUpdates,
      );

      if (!updatedDoctor) {
        throw new Error(`Doctor with ID ${ID} not found`); // Handle when the doctor is not found
      }

      return updatedDoctor;
    } catch (error) {
      throw new Error('Failed to update doctor'); // Handle other errors
    }
  }

  async deleteDoctor(ID: string): Promise<string> {
    const result = await this.doctorsRepository.deleteById(ID);
    if (result.deletedCount && result.deletedCount > 0) {
      return ID;
    } else {
      throw new Error(`Doctor with ID ${ID} not found.`);
    }
  }
}
