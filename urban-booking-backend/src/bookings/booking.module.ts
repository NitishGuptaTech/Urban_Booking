import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookingController } from "./booking.controller";
import { BookingService } from "./booking.service";
import { Booking } from "./entities/booking.entity";
import { Slot } from "../slots/entities/slot.entity";
import { DataSource } from "typeorm";
import { BookingRepository } from "./entities/booking.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Slot])],
  controllers: [BookingController],
  providers: [
    BookingService,
    {
      provide: BookingRepository,
      useFactory: (dataSource: DataSource): BookingRepository =>
        new BookingRepository(dataSource),
      inject: [DataSource],
    },
  ],
  exports: [BookingRepository], // Export if used in other modules
})
export class BookingModule {}
