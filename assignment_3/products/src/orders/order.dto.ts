import { IsArray, IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class OrderItemDto {
  @IsUUID('4', { message: 'Product ID must be a valid UUID' })
  productId: string;

  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;

  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price must be positive' })
  price: number;
}

export class OrderDto {
  @IsString({ message: 'Order ID must be a string' })
  id: string;

  @IsString({ message: 'Customer ID must be a string' })
  customerId: string;

  @IsArray({ message: 'Items must be an array' })
  items: OrderItemDto[];

  @IsNumber({}, { message: 'Total amount must be a number' })
  @Min(0, { message: 'Total amount must be positive' })
  totalAmount: number;

  @IsString({ message: 'Status must be a string' })
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

  @IsString({ message: 'Order date must be a string' })
  orderDate: string;
}
