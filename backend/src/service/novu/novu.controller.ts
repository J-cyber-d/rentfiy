import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { NovuService } from './novu.service';
import { CreateNovuDto } from './dto/create-novu.dto';

import { OnEvent } from '@nestjs/event-emitter';
import { EventNovuComDto } from './dto/event-novu.dto';

@Controller()
export class NovuController {
  constructor(private readonly novuService: NovuService) {}

  @OnEvent('create.novu')
  async create(@Payload() createNovuDto: CreateNovuDto) {
    return await this.novuService.create(createNovuDto);
  }

  @OnEvent('trigger.event')
  async trigger(@Payload() eventNovuDto: EventNovuComDto) {
    return await this.novuService.trigger(eventNovuDto);
  }
}
