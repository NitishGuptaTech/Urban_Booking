import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Body,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { SlotsService } from "./slots.services";

@Controller("slots")
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  @Get("available")
  getAvailableSlots() {
    return this.slotsService.getAvailableSlots();
  }

  @Post("book/:id")
  @HttpCode(HttpStatus.OK)
  bookSlot(@Param("id", ParseIntPipe) id: number) {
    return this.slotsService.bookSlot(id);
  }

  @Post("cancel")
  cancelSlot(@Body() body: { slotId: number }) {
    return this.slotsService.cancelSlot(body.slotId);
  }

  @Post("create")
  createSlot(
    @Body()
    body: {
      carpenterId: number;
      startTime: string;
      endTime: string;
    },
  ) {
    return this.slotsService.createSlot(
      body.carpenterId,
      body.startTime,
      body.endTime,
    );
  }
}
