import { Injectable } from '@nestjs/common';
import { CreateNovuDto } from './dto/create-novu.dto';
import { UpdateNovuDto } from './dto/update-novu.dto';
import { Novu } from '@novu/node';
import { EventNovuComDto } from './dto/event-novu.dto';

@Injectable()
export class NovuService {
  private readonly novu = new Novu(process.env.NOVU_API_KEY);

  async create(createNovuDto: CreateNovuDto) {
    await this.novu.subscribers.identify(createNovuDto.subscriberId, {
      firstName: createNovuDto.firstName,
      lastName: createNovuDto.lastName,
      email: createNovuDto.email,
      phone: createNovuDto.phone,
    });
  }

  //Call Novu Event Pattern
  async trigger(eventNovuComDto: EventNovuComDto) {
    await this.novu.trigger(eventNovuComDto.triggerName, {
      to: eventNovuComDto.to,
      payload: eventNovuComDto.payload,
    });
  }
}
