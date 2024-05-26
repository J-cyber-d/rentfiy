import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './schema/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashPassword } from '../../utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<Users>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const userExsits = await this.usersModel.findOne({
      email: createUserDto.email,
    });
    if (userExsits) {
      throw new ConflictException(
        'Email Already Exsits, Please LogIn to Continue',
      );
    }
    createUserDto.password = await hashPassword(createUserDto.password);
    const users = new this.usersModel(createUserDto);
    return await users.save();
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string): Promise<Users> {
    return await this.usersModel.findById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
