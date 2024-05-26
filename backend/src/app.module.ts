import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './models/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationModule } from './authentication/authentication.module';
import { PropertiesModule } from './models/properties/properties.module';
import { FileuploadModule } from './models/fileupload/fileupload.module';
import { NovuModule } from './service/novu/novu.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL),
    EventEmitterModule.forRoot(),
    AuthenticationModule,
    UsersModule,
    PassportModule,
    PropertiesModule,
    FileuploadModule,
    NovuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
