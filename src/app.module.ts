import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorsModule } from './doctor/doctors.module';
import { PatientsModule } from './patient/patients.module';
import { MedicinesModule } from './medicine/medicines.module';
import { AppointmentsModule } from './appointment/appointments.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@healthapp-backend.46amuiu.mongodb.net/?retryWrites=true&w=majority',
    ),
    DoctorsModule,
    PatientsModule,
    MedicinesModule,
    AppointmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
