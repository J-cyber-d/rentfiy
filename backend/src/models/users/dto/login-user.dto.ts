import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    type: String,
    default: 'dhayalandeena0050@gmail.com',
  })
  readonly email: string;

  @ApiProperty({
    type: String,
    default: '#Deena0050',
  })
  readonly password: string;
}
