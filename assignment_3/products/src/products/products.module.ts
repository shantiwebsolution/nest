import { Module } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { ProductsService } from './products.service';

@Module({
  providers: [LoggerService, ProductsService],
  exports: [LoggerService, ProductsService],
})
export class ProductsModule {}
