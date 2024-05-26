import { Module } from '@nestjs/common';
import { NovuService } from './novu.service';
import { NovuController } from './novu.controller';

@Module({
  controllers: [NovuController],
  providers: [NovuService],
})
export class NovuModule {}
