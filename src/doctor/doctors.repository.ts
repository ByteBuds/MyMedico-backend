import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Doctor, DoctorDocument } from './schemas/doctor.schema';

@Injectable()
export class DoctorsRepository {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
  ) {}

  async findOne(
    doctorFilterQuery: FilterQuery<Doctor>,
  ): Promise<Doctor | null> {
    try {
      const doctor = await this.doctorModel.findOne(doctorFilterQuery);
      return doctor;
    } catch (error) {
      throw new Error('Failed to fetch doctor'); // Handle database error
    }
  }

  async find(doctorFilterQuery: FilterQuery<Doctor>): Promise<Doctor[]> {
    return this.doctorModel.find(doctorFilterQuery);
  }

  async create(doctor: Doctor): Promise<Doctor> {
    const newDoctor = new this.doctorModel(doctor);
    return newDoctor.save();
  }

  async findOneAndUpdate(
    doctorFilterQuery: FilterQuery<Doctor>,
    doctor: Partial<Doctor>,
  ): Promise<Doctor> {
    try {
      const updatedDoctor = await this.doctorModel.findOneAndUpdate(
        doctorFilterQuery,
        doctor,
        {
          new: true,
        },
      );

      if (!updatedDoctor) {
        throw new Error('Doctor not found'); // Handle when the doctor is not found
      }

      return updatedDoctor;
    } catch (error) {
      throw new Error('Failed to update doctor'); // Handle other errors
    }
  }

  async deleteById(ID: string): Promise<any> {
    return this.doctorModel.deleteOne({ ID: ID }).exec();
  }
}
