import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';
import {
  CustomerInfoDto,
  OrderItemResponseDto,
  OrderResponseDto,
} from './order-response.dto';
import { OrderDto } from './order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}
  private orders: OrderDto[] = [
    {
      id: 'ord-001',
      customerId: '3f5e3a9c-2d4b-4f13-8a8e-9b7c6a5d4e3f',
      items: [
        {
          productId: 'f6a1c4d2-3b9e-4a77-9f21-5d2e7a8c9b10',
          quantity: 1,
          price: 119900,
        },
      ],
      totalAmount: 119900,
      status: 'delivered',
      orderDate: '2025-01-15T10:30:00Z',
    },
    {
      id: 'ord-002',
      customerId: '7b2c1d4e-8f90-4a7b-9c1d-2e3f4a5b6c7d',
      items: [
        {
          productId: '0c3e2b14-7f58-4f20-9a6d-3b2c5a7e9d41',
          quantity: 1,
          price: 159990,
        },
        {
          productId: 'ab12cd34-56ef-4789-90ab-cdef12345678',
          quantity: 2,
          price: 129990,
        },
      ],
      totalAmount: 419970,
      status: 'shipped',
      orderDate: '2025-01-20T14:15:00Z',
    },
    {
      id: 'ord-003',
      customerId: 'c1a2b3d4-e5f6-4a78-9b0c-d1e2f3a4b5c6',
      items: [
        {
          productId: '9d8c7b6a-5e4f-4321-9a0b-1c2d3e4f5a6b',
          quantity: 1,
          price: 139990,
        },
      ],
      totalAmount: 139990,
      status: 'confirmed',
      orderDate: '2025-01-22T09:45:00Z',
    },
    {
      id: 'ord-004',
      customerId: 'e9f8d7c6-b5a4-4c3d-8e2f-1a0b9c8d7e6f',
      items: [
        {
          productId: '123e4567-e89b-12d3-a456-426614174000',
          quantity: 1,
          price: 189990,
        },
        {
          productId: 'f6a1c4d2-3b9e-4a77-9f21-5d2e7a8c9b10',
          quantity: 1,
          price: 119900,
        },
      ],
      totalAmount: 309890,
      status: 'pending',
      orderDate: '2025-01-25T16:20:00Z',
    },
    {
      id: 'ord-005',
      customerId: 'a0b1c2d3-e4f5-4a6b-8c7d-9e0f1a2b3c4d',
      items: [
        {
          productId: 'ab12cd34-56ef-4789-90ab-cdef12345678',
          quantity: 1,
          price: 129990,
        },
        {
          productId: '9d8c7b6a-5e4f-4321-9a0b-1c2d3e4f5a6b',
          quantity: 1,
          price: 139990,
        },
      ],
      totalAmount: 269980,
      status: 'delivered',
      orderDate: '2025-01-18T11:00:00Z',
    },
  ];

  findOne(id: string) {
    return this.orders.find((order) => order.id === id);
  }

  // Helper method to get customer information
  private getCustomerInfo(customerId: string): CustomerInfoDto {
    const user = this.usersService.findOne(customerId);
    if (!user) {
      throw new Error(`Customer with ID ${customerId} not found`);
    }

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    };
  }

  // Helper method to get product information
  private getProductInfo(productId: string): { id: string; name: string } {
    const product = this.productsService.findOne(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }

    return {
      id: product.id,
      name: product.name,
    };
  }

  // Helper method to enrich order items with product names
  private enrichOrderItems(items: any[]): OrderItemResponseDto[] {
    return items.map((item) => {
      const productInfo = this.getProductInfo(item.productId);
      return {
        productId: item.productId,
        productName: productInfo.name,
        quantity: item.quantity,
        price: item.price,
      };
    });
  }

  // Get all orders with enriched customer and product information
  findAllWithDetails(): OrderResponseDto[] {
    return this.orders.map((order) => {
      const customer = this.getCustomerInfo(order.customerId);
      const enrichedItems = this.enrichOrderItems(order.items);

      return {
        id: order.id,
        customer,
        items: enrichedItems,
        totalAmount: order.totalAmount,
        status: order.status,
        orderDate: order.orderDate,
      };
    });
  }

  // Get single order with enriched customer and product information
  findOneWithDetails(id: string): OrderResponseDto | null {
    const order = this.orders.find((order) => order.id === id);
    if (!order) {
      return null;
    }

    const customer = this.getCustomerInfo(order.customerId);
    const enrichedItems = this.enrichOrderItems(order.items);

    return {
      id: order.id,
      customer,
      items: enrichedItems,
      totalAmount: order.totalAmount,
      status: order.status,
      orderDate: order.orderDate,
    };
  }
}
