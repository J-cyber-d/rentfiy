import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  Request,
  Inject,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './schema/users.schema';
import { ApiTags } from '@nestjs/swagger';
import { ResponseService } from '../../common/interceptors/response.interceptor';
import { AuthenticationGuard } from '../../authentication/authentication.guard';
import { EventEmitter2 } from '@nestjs/event-emitter';

@ApiTags('Users')
@UseInterceptors(ResponseService)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<Users> {
    const user = await this.usersService.create(createUserDto);
    if (user) {
      this.eventEmitter.emit('create.novu', {
        subscriberId: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phoneNumber,
      });
      //
      this.eventEmitter.emit('trigger.event', {
        to: {
          subscriberId: user._id,
        },
        triggerName: 'password-reset',
      });
    }
    return user;
  }

  @UseGuards(AuthenticationGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthenticationGuard)
  @Get('data')
  async finduserData(@Request() req): Promise<Users> {
    return req.user;
  }

  @UseGuards(AuthenticationGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
