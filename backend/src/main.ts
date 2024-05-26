import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/httpException.filter';
import { ValidationExpectionFilter } from './common/filters/validationException.filter';
import { MongooseExceptionFilter } from './common/filters/mongooseException.filter';
import { MongoExceptionFilter } from './common/filters/mongoException.filter';
import { ValidationPipe } from '@nestjs/common';
import passport from 'passport';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Set Global Prefix
  app.setGlobalPrefix('api', {
    exclude: ['swagger/api'], //add later -- 'signin', 'callback', -- need to find an solution to without global prefix in front-end proxy middleware
  });

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);
  SwaggerModule.setup('swagger/api', app, document, {
    customSiteTitle: 'Golden Notes',
    customfavIcon:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpJ4F135sD387QrO9m_aRbf6YBGbLsLYZju8FW7cTKs7acK3Kl7RAi2qz3IpYmaZx9Hpk',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
  });
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.enableCors();
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new ValidationExpectionFilter(),
    new MongooseExceptionFilter(),
    new MongoExceptionFilter(),
  );
  //validationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(process.env.PORT || 8000);
}
bootstrap();
