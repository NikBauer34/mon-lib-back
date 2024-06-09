import { Body, Controller, Post, Headers } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/createEvent.dto';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Post('/create')
  create(@Body() dto: CreateEventDto, @Headers() headers: Record<string, string>) {
    console.log(headers)
    return this.eventService.create(dto, headers.authorization)
  }
}
