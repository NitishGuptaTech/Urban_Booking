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

  async getAvailableSlots(): Promise<Slot[]> {
    return this.slotRepository.find({
      where: { available: true },
      relations: ["carpenter"],
    });
  }

  async bookSlot(slotId: number): Promise<Slot> {
    const slot = await this.slotRepository.findOne({
      where: { id: slotId },
      relations: ["carpenter"],
      lock: { mode: "pessimistic_write" },
    });

    if (!slot) {
      throw new NotFoundException("Slot not found");
    }

    if (!slot.available) {
      throw new ConflictException("Slot is already booked");
    }

    slot.available = false;
    return await this.slotRepository.save(slot);
  }

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

    const slot = this.slotRepository.create({
      startTime,
      endTime,
      available: true,
      carpenter,
    });

    return await this.slotRepository.save(slot);
  }
}
