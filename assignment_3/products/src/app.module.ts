import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';
import { ProductsService } from './products/products.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { OrdersModule } from './orders/orders.module';
@Module({
  imports: [ProductsModule, LoggerModule, UsersModule, OrdersModule],
  controllers: [AppController, ProductsController, UsersController, OrdersController],
  providers: [AppService, ProductsService, UsersService, OrdersService],
})
export class AppModule {}
