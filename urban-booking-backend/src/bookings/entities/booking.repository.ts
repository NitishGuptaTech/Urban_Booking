import { DataSource, Repository } from "typeorm";
import { Booking } from "./booking.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BookingRepository extends Repository<Booking> {
  constructor(private readonly dataSource: DataSource) {
    super(Booking, dataSource.createEntityManager());
  }

  async findByUserId(userId: number): Promise<Booking[]> {
    return this.find({
      where: { userId },
      relations: ["slot"],
      order: { id: "DESC" },
    });
  }

  async createBooking(userId: number, slotId: number): Promise<Booking> {
    const booking = this.create({
      userId,
      slot: { id: slotId } as Partial<Booking["slot"]>, // allow linking slot by ID safely
    });

    return this.save(booking);
  }

  async cancelBooking(id: number): Promise<void> {
    await this.delete(id);
  }
}
