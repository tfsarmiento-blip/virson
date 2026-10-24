
import { Module } from '@nestjs/common';
import { OrderController } from './Order.controller';
import { OrderService } from './Order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
