import { Controller, Get, Post, Param, Body, Delete } from "@nestjs/common";
// import { CarpentersService } from './carpenters.service';
import { Carpenter } from "./entities/carpenter.entity";
import { CarpentersService } from "./carpenter.service";

@Controller("carpenters")
export class CarpentersController {
  constructor(private readonly carpentersService: CarpentersService) {}

  @Get()
  async findAll(): Promise<Carpenter[]> {
    return this.carpentersService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Carpenter | null> {
    return this.carpentersService.findOne(+id);
  }

  @Post()
  async create(@Body() carpenterData: Partial<Carpenter>): Promise<Carpenter> {
    return this.carpentersService.create(carpenterData);
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<void> {
    return this.carpentersService.remove(+id);
  }
}
