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
import EasyYandexS3 from 'easy-yandex-s3';
@Injectable()
export class EventService {
  s3: EasyYandexS3;
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>,
              private categoryService: CategoryService,
            private jwtService: JwtService,
          private userService: UserService,
          private museumService: MuseumService) {
            this.s3 = new EasyYandexS3({
              auth: {
                accessKeyId: 'YCAJESV0A49lEzhUCIA6ZjAJt',
                secretAccessKey: 'YCNiAiNfe6LSBIh3jhM1BYz40ypab-cbfZAeXkOP'
              },
              Bucket: 'unilib-storage',
              debug: process.env.NODE_ENV == 'development' ? true : false
            })
          }

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
    const museum = await this.museumService.findById(event.organizer)
    return museum
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
  async upload(buffer: Buffer, name: string) {
    console.log('upl')
  }
  async getLatest(museum_title: string, limit: number, page: number, regex: string) {
    const museum = await this.museumService.findByTitle(museum_title)
    const conditions = {organizer: museum._id}
    const skipAmount = (page-1) * limit
    const eventsQuery = await this.eventModel.find(conditions)
      .sort({ createdAt: 'desc' })
      .where('title').regex(regex)
      .skip(skipAmount)
      .limit(limit)
      
    let events = await Promise.all(eventsQuery.map(async (el) => {
      const category = await this.categoryService.findById(el.category)
      const organizer = await this.museumService.findById(el.organizer)
      return {el, category, organizer}
    }))
    console.log(eventsQuery)
    const eventsCount = await this.eventModel.countDocuments(conditions)
    console.log(eventsCount)
    return {data: events, totalPages: Math.ceil(eventsCount/limit)}
  }
  async getUserData(access: string) {
    if (!access) {
      return null
    }
    const user = this.jwtService.verify(access, {secret: 'secret2'})
    const user_db = await this.userService.findById(user._id)
    return user_db
  }
  async addOrder(event_id: Types.ObjectId, order_id: Types.ObjectId) {
    const event = await this.eventModel.findById(event_id)
    event.orders.push(order_id)
    await event.save()
    return event
  }
}
