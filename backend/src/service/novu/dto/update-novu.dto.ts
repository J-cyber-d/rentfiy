import { PartialType } from '@nestjs/mapped-types';
import { CreateNovuDto } from './create-novu.dto';

export class UpdateNovuDto extends PartialType(CreateNovuDto) {
  id: number;
}
