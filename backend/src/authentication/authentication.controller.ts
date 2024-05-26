import {
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LocalAuthGuard } from './passportStrategy/local.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from '../models/users/dto/login-user.dto';
import { ResponseService } from '../common/interceptors/response.interceptor';

@ApiTags('Auth')
@UseInterceptors(ResponseService)
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({
    type: LoginUserDto,
  })
  @Post('login')
  async login(@Request() req): Promise<any> {
    return req.user;
  }

  @Post('logout')
  async logout(@Request() req): Promise<any> {
    return new Promise((resolve, reject) => {
      req.logout((err) => {
        if (err) {
          return reject(err);
        }
        req.session.destroy((err) => {
          if (err) {
            return reject(err);
          }
          resolve({ msg: 'Logout successfully' });
        });
      });
    });
  }
}
