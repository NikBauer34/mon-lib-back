import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { Types } from 'mongoose';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  // @UseGuards(JwtAuthGuard)
  @Get('/get_all')
  getAll() {
    return this.categoryService.getAll()
  }

  // @UseGuards(JwtAuthGuard)
  @Post('/create')
  create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto)
  }
  @Get('/delete/:id')
  delete(@Param(':id') id: Types.ObjectId) {
    return this.categoryService.delete(id)
  }
}
