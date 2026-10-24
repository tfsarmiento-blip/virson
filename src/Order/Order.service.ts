
import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class OrderService {
  constructor(private readonly databaseService: DatabaseService) {}

  // Get all orders with user, product, and category info
  async getAll() {
    const [rows] = await this.databaseService.getPool().query(
      `SELECT o.*, u.username, p.product_name, p.product_code, p.price, c.category_name, c.category_code 
       FROM orders o 
       LEFT JOIN users u ON o.id = u.id 
       LEFT JOIN products p ON o.product_id = p.product_id 
       LEFT JOIN category c ON p.category_id = c.category_id`,
    );

    return rows;
  }

  // Get an order by ID with user, product, and category info
  async findById(order_id: number) {
    const [rows]: any = await this.databaseService.getPool().query(
      `SELECT o.*, u.username, p.product_name, p.product_code, p.price, c.category_name, c.category_code 
       FROM orders o 
       LEFT JOIN users u ON o.id = u.id 
       LEFT JOIN products p ON o.product_id = p.product_id 
       LEFT JOIN category c ON p.category_id = c.category_id 
       WHERE o.order_id = ?`,
      [order_id],
    );

    if (rows.length === 0) {
      throw new NotFoundException(`Order with ID ${order_id} not found`);
    }

    return rows[0];
  }

  // Get all orders by user ID
  async findByUserId(userId: number) {
    const [rows]: any = await this.databaseService.getPool().query(
      `SELECT o.*, u.username, p.product_name, p.product_code, p.price, c.category_name, c.category_code 
       FROM orders o 
       LEFT JOIN users u ON o.id = u.id 
       LEFT JOIN products p ON o.product_id = p.product_id 
       LEFT JOIN category c ON p.category_id = c.category_id 
       WHERE o.id = ?`,
      [userId],
    );

    return rows;
  }

  // Create an order
  async create(body: {
    order_code: string;
    product_id: number;
    quantity: number;
    total_price: number;
    status?: string;
    id?: number;
  }) {
    const [result]: any = await this.databaseService.getPool().query(
      'INSERT INTO orders (order_code, product_id, quantity, total_price, status, id) VALUES (?, ?, ?, ?, ?, ?)',
      [
        body.order_code,
        body.product_id,
        body.quantity,
        body.total_price,
        body.status || 'pending',
        body.id || null,
      ],
    );

    return {
      message: 'Order created successfully',
      order_id: result.insertId,
      order_code: body.order_code,
      product_id: body.product_id,
      quantity: body.quantity,
      total_price: body.total_price,
      status: body.status || 'pending',
      id: body.id,
    };
  }

  // Update an order
  async update(
    order_id: number,
    body: {
      order_code?: string;
      product_id?: number;
      quantity?: number;
      total_price?: number;
      status?: string;
      id?: number;
    },
  ) {
    await this.findById(order_id);

    const fields: string[] = [];
    const values: any[] = [];

    if (body.order_code !== undefined) {
      fields.push('order_code = ?');
      values.push(body.order_code);
    }
    if (body.product_id !== undefined) {
      fields.push('product_id = ?');
      values.push(body.product_id);
    }
    if (body.quantity !== undefined) {
      fields.push('quantity = ?');
      values.push(body.quantity);
    }
    if (body.total_price !== undefined) {
      fields.push('total_price = ?');
      values.push(body.total_price);
    }
    if (body.status !== undefined) {
      fields.push('status = ?');
      values.push(body.status);
    }
    if (body.id !== undefined) {
      fields.push('id = ?');
      values.push(body.id);
    }

    if (fields.length === 0) {
      return { message: 'No changes made' };
    }

    values.push(order_id);

    await this.databaseService.getPool().query(
      `UPDATE orders SET ${fields.join(', ')} WHERE order_id = ?`,
      values,
    );

    return {
      message: 'Order updated successfully',
      order_id: order_id,
      ...body,
    };
  }

  // Delete an order
  async delete(order_id: number) {
    await this.findById(order_id);

    await this.databaseService.getPool().query(
      'DELETE FROM orders WHERE order_id = ?',
      [order_id],
    );

    return {
      message: 'Order deleted successfully',
    };
  }
}
