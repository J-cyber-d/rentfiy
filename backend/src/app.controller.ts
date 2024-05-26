import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHelloWorld(): string {
    // eslint-disable-next-line prettier/prettier
    return 'Hellow World';
  }

  @Get('healthcheck')
  getHello(): string {
    // eslint-disable-next-line prettier/prettier
    return this.appService.getHello();
  }
}
