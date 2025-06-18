import { Controller, Post, Body } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { BookSlotDto } from "./dto/book.dto";

@Controller("bookings")
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async bookSlot(@Body() bookSlotDto: BookSlotDto) {
    return await this.bookingService.bookSlot(bookSlotDto);
  }
}
