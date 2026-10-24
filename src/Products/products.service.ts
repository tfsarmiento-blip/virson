
import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}

  // Get all products with user and category info
  async getAll() {
    const [rows] = await this.databaseService.getPool().query(
      `SELECT p.*, u.username, c.category_name, c.category_code 
       FROM products p 
       LEFT JOIN users u ON p.id = u.id 
       LEFT JOIN category c ON p.category_id = c.category_id`,
    );

    return rows;
  }

  // Get a product by ID with user and category info
  async findById(product_id: number) {
    const [rows]: any = await this.databaseService.getPool().query(
      `SELECT p.*, u.username, c.category_name, c.category_code 
       FROM products p 
       LEFT JOIN users u ON p.id = u.id 
       LEFT JOIN category c ON p.category_id = c.category_id 
       WHERE p.product_id = ?`,
      [product_id],
    );

    if (rows.length === 0) {
      throw new NotFoundException(`Product with ID ${product_id} not found`);
    }

    return rows[0];
  }

  // Get all products by User ID
  async findByUserId(userId: number) {
    const [rows]: any = await this.databaseService.getPool().query(
      `SELECT p.*, u.username, c.category_name, c.category_code 
       FROM products p 
       LEFT JOIN users u ON p.id = u.id 
       LEFT JOIN category c ON p.category_id = c.category_id 
       WHERE p.id = ?`,
      [userId],
    );

    return rows;
  }

  // Create a product
  async create(body: {
    product_code: string;
    product_name: string;
    description?: string;
    price: number;
    stock?: number;
    category_id?: number;
    id?: number;
  }) {
    const [result]: any = await this.databaseService.getPool().query(
      'INSERT INTO products (product_code, product_name, description, price, stock, category_id, id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        body.product_code,
        body.product_name,
        body.description || null,
        body.price,
        body.stock || 0,
        body.category_id || null,
        body.id || null,
      ],
    );

    return {
      message: 'Product created successfully',
      product_id: result.insertId,
      product_code: body.product_code,
      product_name: body.product_name,
      description: body.description,
      price: body.price,
      stock: body.stock,
      category_id: body.category_id,
      id: body.id,
    };
  }

  // Update a product
  async update(
    product_id: number,
    body: {
      product_code?: string;
      product_name?: string;
      description?: string;
      price?: number;
      stock?: number;
      category_id?: number;
      id?: number;
    },
  ) {
    await this.findById(product_id);

    const fields: string[] = [];
    const values: any[] = [];

    if (body.product_code !== undefined) {
      fields.push('product_code = ?');
      values.push(body.product_code);
    }
    if (body.product_name !== undefined) {
      fields.push('product_name = ?');
      values.push(body.product_name);
    }
    if (body.description !== undefined) {
      fields.push('description = ?');
      values.push(body.description);
    }
    if (body.price !== undefined) {
      fields.push('price = ?');
      values.push(body.price);
    }
    if (body.stock !== undefined) {
      fields.push('stock = ?');
      values.push(body.stock);
    }
    if (body.category_id !== undefined) {
      fields.push('category_id = ?');
      values.push(body.category_id);
    }
    if (body.id !== undefined) {
      fields.push('id = ?');
      values.push(body.id);
    }

    if (fields.length === 0) {
      return { message: 'No changes made' };
    }

    values.push(product_id);

    await this.databaseService.getPool().query(
      `UPDATE products SET ${fields.join(', ')} WHERE product_id = ?`,
      values,
    );

    return {
      message: 'Product updated successfully',
      product_id: product_id,
      ...body,
    };
  }

  // Delete a product
  async delete(product_id: number) {
    await this.findById(product_id);

    await this.databaseService.getPool().query(
      'DELETE FROM products WHERE product_id = ?',
      [product_id],
    );

    return {
      message: 'Product deleted successfully',
    };
  }
}
