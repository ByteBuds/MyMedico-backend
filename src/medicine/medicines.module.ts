import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicineSchema } from './schemas/medicine.schema';
import { Medicine } from './schemas/medicine.schema';
import { MedicinesController } from './medicines.controller';
import { MedicinesService } from './medicines.service';
import { MedicinesRepository } from './medicines.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Medicine.name, schema: MedicineSchema },
    ]),
  ],
  controllers: [MedicinesController],
  providers: [MedicinesService, MedicinesRepository],
})
export class MedicinesModule {}
