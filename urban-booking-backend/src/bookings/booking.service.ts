import {
  Injectable,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Booking } from "./entities/booking.entity";
import { Slot } from "src/slots/entities/slot.entity";
import { BookSlotDto } from "./dto/book.dto";

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,

    @InjectRepository(Slot)
    private readonly slotRepo: Repository<Slot>,
  ) {}

  async bookSlot(bookSlotDto: BookSlotDto): Promise<Booking> {
    const { slotId, userId } = bookSlotDto;

    // Fetch the slot with a pessimistic lock
    const slot = await this.slotRepo.findOne({
      where: { id: Number(slotId) },
      lock: { mode: "pessimistic_write" },
    });

    if (!slot) {
      throw new NotFoundException("Slot not found");
    }

    // Check if the slot is already booked
    const existingBooking = await this.bookingRepo.findOne({
     where: { slotId: Number(slotId) },

      relations: ["slot"],
    });

    if (existingBooking) {
      throw new ConflictException("Slot already booked");
    }

    // Create and save the new booking
    const booking = this.bookingRepo.create({
      userId,
      slot,
    });

    return await this.bookingRepo.save(booking);
  }
}
