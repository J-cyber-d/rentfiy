import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersModule } from '../models/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, Users } from '../models/users/schema/users.schema';
import { LocalStrategy } from './passportStrategy/local.strategy';
import { SessionSerializer } from './session/session.serializer';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ session: true }),
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy, SessionSerializer],
})
export class AuthenticationModule {}
