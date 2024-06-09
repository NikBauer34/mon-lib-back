import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCategoryDto } from './dto/createCategory.dto';

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
}
