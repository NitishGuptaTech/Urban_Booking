import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    console.log("getHello called");
    return "Hello World!";
  }
}
