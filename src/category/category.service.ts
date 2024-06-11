import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './category.model';
import { Model, Types } from 'mongoose';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async getAll() {
    const categories = await this.categoryModel.find({})
    return categories
  }
  async findByName(name: string) {
    const category = await this.categoryModel.findOne({name})
    return category
  }
  async create(dto: CreateCategoryDto) {
    const category = await this.categoryModel.create({name: dto.categoryName})
    return category
  }
  async findById(_id: Types.ObjectId) {
    const category = await this.categoryModel.findById(_id)
    return category
  }
  async delete(_id: Types.ObjectId) {
    const cat = await this.categoryModel.findByIdAndDelete(_id)
    return cat
  }
}
