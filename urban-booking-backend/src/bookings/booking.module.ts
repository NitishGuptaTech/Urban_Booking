import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookingController } from "./booking.controller";
import { BookingService } from "./booking.service";
import { Booking } from "./entities/booking.entity";
import { Slot } from "../slots/entities/slot.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Slot])],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}
