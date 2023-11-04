import { Patient } from './schemas/patient.schema';
import { PatientsRepository } from './patients.repository';
import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';

@Injectable()
export class PatientsService {
  constructor(private readonly patientsRepository: PatientsRepository) {}

  async getPatientById(ID: string): Promise<Patient | null> {
    try {
      const patient = await this.patientsRepository.findOne({ ID });
      if (!patient) {
        throw new Error(`Patient with ID ${ID} not found`);
      }
      return patient;
    } catch (error) {
      throw new Error('Failed to fetch patient'); // Handle other errors
    }
  }

  async getPatients(): Promise<Patient[]> {
    return this.patientsRepository.find({});
  }

  async createPatient(patient: Patient): Promise<Patient> {
    return this.patientsRepository.create({
      ...patient,
      entityType: 'patient',
      ID: uuid(),
    });
  }

  async updatePatient(ID: string, patientUpdates: Patient): Promise<Patient> {
    try {
      const newPatientUpdates = {
        ...patientUpdates,
        ID: ID,
      };
      const updatedPatient = await this.patientsRepository.findOneAndUpdate(
        { ID: ID },
        newPatientUpdates,
      );

      if (!updatedPatient) {
        throw new Error(`Patient with ID ${ID} not found`); // Handle when the patient is not found
      }

      return updatedPatient;
    } catch (error) {
      throw new Error('Failed to update patient'); // Handle other errors
    }
  }

  async deletePatient(ID: string): Promise<string> {
    const result = await this.patientsRepository.deleteById(ID);
    if (result.deletedCount && result.deletedCount > 0) {
      return ID;
    } else {
      throw new Error(`Patient with ID ${ID} not found.`);
    }
  }
}
