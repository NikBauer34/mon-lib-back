import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Museum } from './museum.model';
import { Model, Types } from 'mongoose';
import { CreateMuseumDto } from './dto/CreateMuseum.dto';
import * as bcrypt from 'bcrypt'
@Injectable()
export class MuseumService {
  constructor(@InjectModel(Museum.name) private museumModel: Model<Museum>) {}

  async getAll() {
    const orders = await this.museumModel.find({})
    return orders
  }
  async create(dto: CreateMuseumDto) {
    const hashPassword = bcrypt.hashSync(dto.password, 5)
    const order = await this.museumModel.create({...dto, password: hashPassword, events: []})
    return order
  }
  async findById(_id: Types.ObjectId) {
    const order = await this.museumModel.findById(_id)
    return order
  }
  async findByUsername(username: string) {
    const museum = await this.museumModel.findOne({username})
    return museum
  }
  async addEvent(museum_id: Types.ObjectId, event_id: Types.ObjectId) {
    let museum = await this.museumModel.findById(museum_id)
    museum.events.push(event_id)
    await museum.save()
    return museum

  }
}
