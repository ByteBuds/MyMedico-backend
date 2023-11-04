import { Medicine } from './schemas/medicine.schema';
import { MedicinesRepository } from './medicines.repository';
import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';

@Injectable()
export class MedicinesService {
  constructor(private readonly medicinesRepository: MedicinesRepository) {}

  async getMedicineById(ID: string): Promise<Medicine | null> {
    try {
      const medicine = await this.medicinesRepository.findOne({ ID });
      if (!medicine) {
        throw new Error(`Medicine with ID ${ID} not found`);
      }
      return medicine;
    } catch (error) {
      throw new Error('Failed to fetch medicine'); // Handle other errors
    }
  }

  async getMedicines(): Promise<Medicine[]> {
    return this.medicinesRepository.find({});
  }

  async createMedicine(medicine: Medicine): Promise<Medicine> {
    return this.medicinesRepository.create({
      ...medicine,
      entityType: 'medicine',
      ID: uuid(),
    });
  }

  async updateMedicine(
    ID: string,
    medicineUpdates: Medicine,
  ): Promise<Medicine> {
    try {
      const newMedicineUpdates = {
        ...medicineUpdates,
        ID: ID,
      };
      const updatedPatient = await this.medicinesRepository.findOneAndUpdate(
        { ID: ID },
        newMedicineUpdates,
      );

      if (!updatedPatient) {
        throw new Error(`Patient with ID ${ID} not found`); // Handle when the patient is not found
      }

      return updatedPatient;
    } catch (error) {
      throw new Error('Failed to update patient'); // Handle other errors
    }
  }

  async deleteMedicine(ID: string): Promise<string> {
    const result = await this.medicinesRepository.deleteById(ID);
    if (result.deletedCount && result.deletedCount > 0) {
      return ID;
    } else {
      throw new Error(`Medicine with ID ${ID} not found.`);
    }
  }
}
