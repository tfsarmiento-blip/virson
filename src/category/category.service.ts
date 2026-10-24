
import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class CategoryService {
  constructor(private readonly databaseService: DatabaseService) {}

  // Get all categories with user info
  async getAll() {
    const [rows] = await this.databaseService.getPool().query(
      `SELECT c.*, u.username 
       FROM category c 
       LEFT JOIN users u ON c.id = u.id`,
    );

    return rows;
  }

  // Get a category by ID with user info
  async findById(id: number) {
    const [rows]: any = await this.databaseService.getPool().query(
      `SELECT c.*, u.username 
       FROM category c 
       LEFT JOIN users u ON c.id = u.id 
       WHERE c.category_id = ?`,
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return rows[0];
  }

  // Get all categories by user ID
  async findByUserId(userId: number) {
    const [rows]: any = await this.databaseService.getPool().query(
      `SELECT c.*, u.username 
       FROM category c 
       LEFT JOIN users u ON c.id = u.id 
       WHERE c.id = ?`,
      [userId],
    );

    return rows;
  }

  // Create a category
  async create(body: { category_code: string; category_name: string; id?: number }) {
    const [result]: any = await this.databaseService.getPool().query(
      'INSERT INTO category (category_code, category_name, id) VALUES (?, ?, ?)',
      [body.category_code, body.category_name, body.id || null],
    );

    return {
      message: 'Category created successfully',
      category_id: result.insertId,
      category_code: body.category_code,
      category_name: body.category_name,
      id: body.id,
    };
  }

  // Update a category
  async update(category_id: number, body: { category_code?: string; category_name?: string; id?: number }) {
    await this.findById(category_id);

    const fields: string[] = [];
    const values: any[] = [];

    if (body.category_code !== undefined) {
      fields.push('category_code = ?');
      values.push(body.category_code);
    }
    if (body.category_name !== undefined) {
      fields.push('category_name = ?');
      values.push(body.category_name);
    }
    if (body.id !== undefined) {
      fields.push('id = ?');
      values.push(body.id);
    }

    if (fields.length === 0) {
      return { message: 'No changes made' };
    }

    values.push(category_id);

    await this.databaseService.getPool().query(
      `UPDATE category SET ${fields.join(', ')} WHERE category_id = ?`,
      values,
    );

    return {
      message: 'Category updated successfully',
      category_id: category_id,
      ...body,
    };
  }

  // Delete a category
  async delete(category_id: number) {
    await this.findById(category_id);

    await this.databaseService.getPool().query(
      'DELETE FROM category WHERE category_id = ?',
      [category_id],
    );

    return {
      message: 'Category deleted successfully',
    };
  }
}
