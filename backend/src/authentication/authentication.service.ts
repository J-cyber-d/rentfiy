import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/models/users/schema/users.schema';
import { comparePassword } from '../utils/bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<Users>,
  ) {}

  async validate(email: string, pass: string): Promise<Users> {
    const userExsits = await this.userModel.findOne({
      email: email,
    });
    if (!userExsits) {
      throw new NotFoundException('Email Not Found or Invalid Password');
    }
    const checkPassword = await comparePassword(pass, userExsits.password);
    if (!checkPassword) {
      throw new UnauthorizedException('Email Not Found or Invalid Password');
    }
    return userExsits;
  }
}
