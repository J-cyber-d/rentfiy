import { BadRequestException, PipeTransform } from '@nestjs/common';
import mongoose from 'mongoose';

export class ValidateMongodbObjectIdPipe implements PipeTransform<string> {
  transform(value: string) {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new BadRequestException(
        'Invalid ObjectId from URL parameter provided',
      );
    }
    return value;
  }
}
