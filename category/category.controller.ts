import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';

import { CategoryService } from './category.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoriesService: CategoryService,
  ) {}

  // Get all categories (protected)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.categoriesService.getAll();
  }

  // Get a single category by ID (protected)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.categoriesService.findById(Number(id));
  }

  // Create a category (protected)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() body: { category_name: string },
  ) {
    return this.categoriesService.create(body);
  }

  // Update a category (protected)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { category_name?: string },
  ) {
    return this.categoriesService.update(
      Number(id),
      body,
    );
  }

  // Delete a category (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.categoriesService.delete(Number(id));
  }
}
