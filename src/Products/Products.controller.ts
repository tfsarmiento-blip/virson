import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  // Get all products
  @Get()
  async getAll() {
    return this.productsService.getAll();
  }

  // Get a single product by ID
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.productsService.findById(Number(id));
  }

  // Get all products by User ID
  @Get('user/:userId')
  async getByUser(@Param('userId') userId: string) {
    return this.productsService.findByUserId(Number(userId));
  }

  // Create a product
  @Post()
  async create(
    @Body()
    body: {
      product_code: string;
      product_name: string;
      description?: string;
      price: number;
      stock?: number;
      category_id?: number;
      id?: number;
    },
  ) {
    return this.productsService.create(body);
  }

  // Update a product
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    body: {
      product_code?: string;
      product_name?: string;
      description?: string;
      price?: number;
      stock?: number;
      category_id?: number;
      id?: number;
    },
  ) {
    return this.productsService.update(Number(id), body);
  }

  // Delete a product
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productsService.delete(Number(id));
  }
}
