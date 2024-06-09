import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './event.model';
import { Model, Types } from 'mongoose';
import { CreateEventDto } from './dto/createEvent.dto';
import {CategoryService} from '../category/category.service'
import {JwtService} from "@nestjs/jwt";
@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>,
              private categoryService: CategoryService,
            private jwtService: JwtService) {}

  async getAll() {
    const events = await this.eventModel.find({})
    return events
  }
  async create(dto: CreateEventDto, auth: string) {
    const token = auth.split(' ')[1]
    const category = await this.categoryService.findByName(dto.category)
    const user = this.jwtService.verify(token, {secret: 'secret1'})
    const event = await this.eventModel.create({...dto, category: category._id, organizer: user._id})
    return event
  }
  async findById(_id: Types.ObjectId) {
    const event = await this.eventModel.findById(_id)
    return event
  }
}
