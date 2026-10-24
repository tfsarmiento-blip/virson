import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { OrderService } from './Order.service';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
  ) {}

  // Get all orders
  @Get()
  async getAll() {
    return this.orderService.getAll();
  }

  // Get a single order by ID
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.orderService.findById(Number(id));
  }

  // Get all orders by User ID
  @Get('user/:userId')
  async getByUser(@Param('userId') userId: string) {
    return this.orderService.findByUserId(Number(userId));
  }

  // Create an order
  @Post()
  async create(
    @Body()
    body: {
      order_code: string;
      product_id: number;
      quantity: number;
      total_price: number;
      status?: string;
      id?: number;
    },
  ) {
    return this.orderService.create(body);
  }

  // Update an order
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    body: {
      order_code?: string;
      product_id?: number;
      quantity?: number;
      total_price?: number;
      status?: string;
      id?: number;
    },
  ) {
    return this.orderService.update(Number(id), body);
  }

  // Delete an order
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.orderService.delete(Number(id));
  }
}
