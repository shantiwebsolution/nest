import { Controller, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // Original endpoint - returns orders with IDs only
  @Get()
  findAll() {
    return this.ordersService.findAllWithDetails();
  }

  // Original endpoint - returns single order with IDs only
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }
}
