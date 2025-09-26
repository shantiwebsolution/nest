import { IsNumber, IsString, Min } from 'class-validator';

export class ProductDto {
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsString({ message: 'SKU must be a string' })
  id: string;

  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price must be positive' })
  price: number;
}
