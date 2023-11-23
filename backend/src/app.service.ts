import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "<img src='https://i.imgur.com/PhO7Dg8.png'></img>";
  }
}
