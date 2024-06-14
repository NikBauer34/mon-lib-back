import { Body, Controller, Get, Post } from '@nestjs/common';
import { MuseumService } from './museum.service';
import { CreateMuseumDto } from './dto/CreateMuseum.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Музей')
@Controller('museum')
export class MuseumController {
  constructor(private museumService: MuseumService) {}

  @Post('/create')
  create(@Body() dto: CreateMuseumDto) {
    return this.museumService.create(dto)
  }
  @Get('/get_all')
  getAll() {
    return this.museumService.getAll()
  }
}
