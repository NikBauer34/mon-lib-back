import { Body, Controller, Post, Headers, Req, Get, Param, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/createEvent.dto';
import { Types } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Post('/create')
  create(@Body() dto: CreateEventDto, @Headers() headers: Record<string, string>){
    console.log(headers)
    return this.eventService.create(dto, headers.authorization)
  }
  @Get('/get_all')
  getAll() {
    return this.eventService.getAll()
  }

  @Get('/:id')
  get(@Param('id') id: Types.ObjectId) {
    return this.eventService.getOne(id)
  }
  @Post('/update/:id')
  update(@Param('id') id: Types.ObjectId, @Body() dto: {event: CreateEventDto}) {
    console.log(id)
    console.log(dto)
    return this.eventService.update(id, dto.event)
  }
  @Post('/delete/:id')
  delete(@Body() dto: {eventId: Types.ObjectId}) {
    return this.eventService.delete(dto.eventId)
  }
  @Post('/get_related')
  get_related(@Body()dto: {category: string, eventId: string, page: string, limit: number}) {
    console.log(dto.limit)
    return this.eventService.get_related(dto.category, dto.eventId, dto.limit, Number(dto.page))
  }
  @Get('/is_organizer/:id')
  isOrganizer(@Headers() headers: Record<string, string>, @Param(':id') id: Types.ObjectId) {
    const header = headers.authorization.split(' ')[0]
    const _id = headers.authorization.split(' ')[1] as unknown as Types.ObjectId
    return this.eventService.isOrganizer(_id, header)
  }
  @Get('/organizer_data/:id')
  getOrganizerData(@Param('id') id: Types.ObjectId) {
    console.log('here')
    return this.eventService.getOrganizerData(id)
  }
  @Post('/events-by-user')
  getEventsByUser(@Body() dto: {userId: Types.ObjectId, limit: number, page: number}) {
    return this.eventService.getEventsByUser(dto.userId, dto.limit, dto.page)
  }
}
