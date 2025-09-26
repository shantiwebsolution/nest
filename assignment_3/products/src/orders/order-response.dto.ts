import { IsArray, IsNumber, IsString, Min } from 'class-validator';

export class OrderItemResponseDto {
  @IsString({ message: 'Product ID must be a string' })
  productId: string;

  @IsString({ message: 'Product name must be a string' })
  productName: string;

  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;

  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price must be positive' })
  price: number;
}

export class CustomerInfoDto {
  @IsString({ message: 'Customer ID must be a string' })
  id: string;

  @IsString({ message: 'First name must be a string' })
  firstName: string;

  @IsString({ message: 'Last name must be a string' })
  lastName: string;

  @IsString({ message: 'Email must be a string' })
  email: string;

  @IsString({ message: 'Phone must be a string' })
  phone: string;
}

export class OrderResponseDto {
  @IsString({ message: 'Order ID must be a string' })
  id: string;

  customer: CustomerInfoDto;

  @IsArray({ message: 'Items must be an array' })
  items: OrderItemResponseDto[];

  @IsNumber({}, { message: 'Total amount must be a number' })
  @Min(0, { message: 'Total amount must be positive' })
  totalAmount: number;

  @IsString({ message: 'Status must be a string' })
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

  @IsString({ message: 'Order date must be a string' })
  orderDate: string;
}
