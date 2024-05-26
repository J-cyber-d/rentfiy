import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    default: 'Deena',
  })
  readonly firstName: string;

  @ApiProperty({
    type: String,
    default: 'Dhayalan',
  })
  readonly lastName: string;

  @ApiProperty({
    type: String,
    default: 'dhayalandeena0050@gmail.com',
  })
  readonly email: string;

  @ApiProperty({
    type: String,
    default: '9344154552',
  })
  readonly phoneNumber: string;

  @ApiProperty({
    type: String,
    default: '#Deena0050',
  })
  password: string;
}
