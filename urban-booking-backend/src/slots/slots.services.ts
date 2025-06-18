import {
  Injectable,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Slot } from "./entities/slot.entity";
import { Carpenter } from "src/carpenter/entities/carpenter.entity";

@Injectable()
export class SlotsService {
  constructor(
    @InjectRepository(Slot)
    private readonly slotRepository: Repository<Slot>,

    @InjectRepository(Carpenter)
    private readonly carpenterRepository: Repository<Carpenter>,
  ) {}

  // ✅ Get All Available Slots
  async getAvailableSlots(): Promise<Slot[]> {
    return this.slotRepository.find({
      where: { available: true },
      relations: ["carpenter"],
    });
  }

  // ✅ Book a Slot (Mark Unavailable)
  async bookSlot(slotId: number): Promise<Slot> {
    const slot = await this.slotRepository.findOne({
      where: { id: slotId },
      relations: ["carpenter"],
    });

    if (!slot) {
      console.log("❌ Slot not found:", slotId);
      throw new NotFoundException("Slot not found");
    }

    if (!slot.available) {
      console.log("⚠️ Slot already booked:", slotId);
      throw new ConflictException("Slot is already booked");
    }

    slot.available = false;
    return await this.slotRepository.save(slot);
  }

  // ✅ Cancel a Booked Slot (Mark Available Again)
  async cancelSlot(slotId: number): Promise<Slot> {
    const slot = await this.slotRepository.findOne({
      where: { id: slotId },
      relations: ["carpenter"],
    });

    if (!slot) {
      console.log("❌ Slot not found (for cancel):", slotId);
      throw new NotFoundException("Slot not found");
    }

    if (slot.available) {
      console.log("⚠️ Slot is already available:", slotId);
      throw new ConflictException("Slot is not booked yet");
    }

    slot.available = true;
    return await this.slotRepository.save(slot);
  }

  // ✅ Create a New Slot with Formatted Time String
  async createSlot(
    carpenterId: number,
    startTime: string,
    endTime: string,
  ): Promise<Slot> {
    const carpenter = await this.carpenterRepository.findOne({
      where: { id: carpenterId },
    });

    if (!carpenter) {
      throw new NotFoundException("Carpenter not found");
    }

    const formattedStart = new Date(startTime).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const formattedEnd = new Date(endTime).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const slot = this.slotRepository.create({
      startTime,
      endTime,
      time: `${formattedStart} - ${formattedEnd}`,
      available: true,
      carpenter,
    });

    return await this.slotRepository.save(slot);
  }
}
