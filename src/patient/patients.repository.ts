import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Patient, PatientDocument } from './schemas/patient.schema';

@Injectable()
export class PatientsRepository {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
  ) {}

  async findOne(
    patientFilterQuery: FilterQuery<Patient>,
  ): Promise<Patient | null> {
    try {
      const patient = await this.patientModel.findOne(patientFilterQuery);
      return patient;
    } catch (error) {
      throw new Error('Failed to fetch patient'); // Handle database error
    }
  }

  async find(patientFilterQuery: FilterQuery<Patient>): Promise<Patient[]> {
    return this.patientModel.find(patientFilterQuery);
  }

  async create(patient: Patient): Promise<Patient> {
    const newPatient = new this.patientModel(patient);
    return newPatient.save();
  }

  async findOneAndUpdate(
    patientFilterQuery: FilterQuery<Patient>,
    patient: Partial<Patient>,
  ): Promise<Patient> {
    try {
      const updatedPatient = await this.patientModel.findOneAndUpdate(
        patientFilterQuery,
        patient,
        {
          new: true,
        },
      );

      if (!updatedPatient) {
        throw new Error('Doctor not found'); // Handle when the doctor is not found
      }

      return updatedPatient;
    } catch (error) {
      throw new Error('Failed to update patient'); // Handle other errors
    }
  }

  async deleteById(ID: string): Promise<any> {
    return this.patientModel.deleteOne({ ID: ID }).exec();
  }
}
