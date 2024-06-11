import { Body, Controller, Post } from '@nestjs/common';
import { MuseumService } from './museum.service';
import { CreateMuseumDto } from './dto/CreateMuseum.dto';

@Controller('museum')
export class MuseumController {
  constructor(private museumService: MuseumService) {}

  @Post('/create')
  create(@Body() dto: CreateMuseumDto) {
    return this.museumService.create(dto)
  }
}
