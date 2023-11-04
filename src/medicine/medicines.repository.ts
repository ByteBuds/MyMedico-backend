import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Medicine, MedicineDocument } from './schemas/medicine.schema';

@Injectable()
export class MedicinesRepository {
  constructor(
    @InjectModel(Medicine.name) private medicineModel: Model<MedicineDocument>,
  ) {}

  async findOne(
    medicineFilterQuery: FilterQuery<Medicine>,
  ): Promise<Medicine | null> {
    try {
      const medicine = await this.medicineModel.findOne(medicineFilterQuery);
      return medicine;
    } catch (error) {
      throw new Error('Failed to fetch medicine'); // Handle database error
    }
  }

  async find(medicineFilterQuery: FilterQuery<Medicine>): Promise<Medicine[]> {
    return this.medicineModel.find(medicineFilterQuery);
  }

  async create(medicine: Medicine): Promise<Medicine> {
    const newMedicine = new this.medicineModel(medicine);
    return newMedicine.save();
  }

  async findOneAndUpdate(
    medicineFilterQuery: FilterQuery<Medicine>,
    medicine: Partial<Medicine>,
  ): Promise<Medicine> {
    try {
      const updatedMedicine = await this.medicineModel.findOneAndUpdate(
        medicineFilterQuery,
        medicine,
        {
          new: true,
        },
      );

      if (!updatedMedicine) {
        throw new Error('Medicine not found'); // Handle when the medicine is not found
      }

      return updatedMedicine;
    } catch (error) {
      throw new Error('Failed to update medicine'); // Handle other errors
    }
  }

  async deleteById(ID: string): Promise<any> {
    return this.medicineModel.deleteOne({ ID: ID }).exec();
  }
}
