import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './event.model';
import { Model, Types } from 'mongoose';
import { CreateEventDto } from './dto/createEvent.dto';
import {CategoryService} from '../category/category.service'
import {JwtService} from "@nestjs/jwt";
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.model';
import { Category } from 'src/category/category.model';
import { MuseumService } from 'src/museum/museum.service';
@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>,
              private categoryService: CategoryService,
            private jwtService: JwtService,
          private userService: UserService,
          private museumService: MuseumService) {}

  async getAll() {
    const events = await this.eventModel.find({})
    return events
  }
  async create(dto: CreateEventDto, auth: string) {
    const category = await this.categoryService.findByName(dto.category)
    const museum = this.jwtService.verify(auth, {secret: 'secret2'})

    const event = await this.eventModel.create({...dto, category: category._id, organizer: museum._id})
    let m = await this.museumService.addEvent(museum._id, event._id)
    console.log(event)
    return event
  }
  async findById(_id: Types.ObjectId) {
    const event = await this.eventModel.findById(_id)
    return event
  }
  async getOne(_id: Types.ObjectId) {
    const event = await this.eventModel.findById(_id)
    const category = await this.categoryService.findById(event.category)
    console.log({...event, category: category.name})
    return {event, category: category.name}
  }
  async update(_id: Types.ObjectId, dto: CreateEventDto) {
    const category = await this.categoryService.findByName(dto.category)
    const event = await this.eventModel.findByIdAndUpdate(_id, {...dto, category: category._id})
    console.log(event)
    return event
  }
  async delete(_id: Types.ObjectId) {
    const event = await this.eventModel.findByIdAndDelete(_id)
    return event
  }
  async get_related(category: string, eventId: string, limit: number, page: number) {
    const category_model = await this.categoryService.findByName(category)
    const skipAmount = (Number(page) - 1) * limit
    const conditions = { $and: [{ category: category_model._id }, { _id: { $ne: eventId } }] }
    const eventsQuery = await this.eventModel.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)
      
      let events = await Promise.all(eventsQuery.map(async (el) => {
        const category = await this.categoryService.findById(el.category)
        const organizer = await this.userService.findById(el.organizer)
        return {el, category, organizer}
      }))
      console.log(eventsQuery)
      const eventsCount = await this.eventModel.countDocuments(conditions)
      console.log(eventsCount)
      return {data: events, totalPages: Math.ceil(eventsCount/limit)}
  }
  async isOrganizer(_id: Types.ObjectId, auth: string) {
    const user = this.jwtService.verify(auth, {secret: 'secret2'})
    const event = await this.eventModel.findById(_id)
    if (user._id == event.organizer) {
      return {is_organizer: true}
    } else {
      return {is_organizer: false}
    }
  }
  async getOrganizerData(_id: Types.ObjectId) {
    const event = await this.eventModel.findById(_id)
    const user = await this.userService.findById(event.organizer)
    return user
  }
  async getEventsByUser(userId: Types.ObjectId, limit: number, page: number) {
    const conditions = {organizer: userId}
    const skipAmount = (page-1) * limit
    const eventsQuery = await this.eventModel.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)
      
    let events = await Promise.all(eventsQuery.map(async (el) => {
      const category = await this.categoryService.findById(el.category)
      const organizer = await this.userService.findById(el.organizer)
      return {el, category, organizer}
    }))
    console.log(eventsQuery)
    const eventsCount = await this.eventModel.countDocuments(conditions)
    console.log(eventsCount)
    return {data: events, totalPages: Math.ceil(eventsCount/limit)}
  }
}
