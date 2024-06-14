import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Evently:  сервис для онлайн записи в музей')
    .setDescription('Документация Rest API')
    .setVersion('1.0.0')
    .addTag('Museum')
    .build()
  const doc = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, doc)
  await app.listen(3001);
}
bootstrap();
