import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoriesService: CategoryService,
  ) {}

  // Get all categories
  @Get()
  async getAll() {
    return this.categoriesService.getAll();
  }

  // Get a single category by ID
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.categoriesService.findById(Number(id));
  }

  // Get all categories by User ID
  @Get('user/:userId')
  async getByUser(@Param('userId') userId: string) {
    return this.categoriesService.findByUserId(Number(userId));
  }

  // Create a category
  @Post()
  async create(
    @Body() body: { category_code: string; category_name: string; id?: number },
  ) {
    return this.categoriesService.create(body);
  }

  // Update a category
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { category_code?: string; category_name?: string; id?: number },
  ) {
    return this.categoriesService.update(Number(id), body);
  }

  // Delete a category
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.categoriesService.delete(Number(id));
  }
}
