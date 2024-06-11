import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,
              private JwtService: JwtService) {}

  async findByUsername(username: string) {
    const user = await this.userModel.findOne({username})
    return user
  }
  async create(dto: CreateUserDto) {
    const user = await this.userModel.create(dto)
    return user
  }
  async findById(_id: Types.ObjectId) {
    const user = await this.userModel.findById(_id)
    return user
  }
  async getId(auth: string) {
    const user = this.JwtService.verify(auth, {secret: 'secret2'})
    return user._id
  }
}
