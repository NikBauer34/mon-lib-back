import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './event.model';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import {CategoryModule} from '../category/category.module'
@Module({
  imports: [MongooseModule.forFeature([{name: Event.name, schema: EventSchema}]), JwtModule.register({}), AuthModule, CategoryModule],
  providers: [EventService],
  controllers: [EventController]
})
export class EventModule {}
