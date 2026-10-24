import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './Products/Products.module';
import { OrderModule } from './Order/Order.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    CategoryModule,
    ProductsModule,
    OrderModule,
  ],
})
export class AppModule {}
