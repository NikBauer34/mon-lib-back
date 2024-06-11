import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './event.model';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import {CategoryModule} from '../category/category.module'
import { UserModule } from 'src/user/user.module';
import { MuseumModule } from 'src/museum/museum.module';
@Module({
  imports: [MongooseModule.forFeature([{name: Event.name, schema: EventSchema}]), JwtModule.register({}), AuthModule, CategoryModule, UserModule, MuseumModule],
  providers: [EventService],
  controllers: [EventController],
  exports: [EventService]
})
export class EventModule {}
