import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Carpenter } from "./entities/carpenter.entity";

@Injectable()
export class CarpentersService {
  constructor(
    @InjectRepository(Carpenter)
    private carpenterRepository: Repository<Carpenter>,
  ) {}

  async findAll(): Promise<Carpenter[]> {
    return this.carpenterRepository.find();
  }

  async findOne(id: number): Promise<Carpenter | null> {
    return this.carpenterRepository.findOneBy({ id });
  }

  async create(carpenter: Partial<Carpenter>): Promise<Carpenter> {
    const newCarpenter = this.carpenterRepository.create(carpenter);
    return this.carpenterRepository.save(newCarpenter);
  }

  async remove(id: number): Promise<void> {
    await this.carpenterRepository.delete(id);
  }
}
