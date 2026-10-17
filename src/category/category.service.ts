
import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class CategoryService {
  constructor(private readonly databaseService: DatabaseService) {}

  // Get all categories
  async getAll() {
    const [rows] = await this.databaseService.getPool().query(
      'SELECT * FROM category',
    );

    return rows;
  }

  // Get a category by ID
  async findById(id: number) {
    const [rows]: any = await this.databaseService.getPool().query(
      'SELECT * FROM category WHERE category_id = ?',
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return rows[0];
  }

  // Create a category
  async create(body: { category_name: string }) {
    const [result]: any = await this.databaseService.getPool().query(
      'INSERT INTO category (category_name) VALUES (?)',
      [body.category_name],
    );

    return {
      message: 'Category created successfully',
      category_id: result.insertId,
      category_name: body.category_name,
    };
  }

  // Update a category
  async update(id: number, body: { category_name?: string }) {
    await this.findById(id);

    if (!body.category_name) {
      return {
        message: 'No changes made',
      };
    }

    await this.databaseService.getPool().query(
      'UPDATE category SET category_name = ? WHERE category_id = ?',
      [body.category_name, id],
    );

    return {
      message: 'Category updated successfully',
      category_id: id,
      category_name: body.category_name,
    };
  }

  // Delete a category
  async delete(id: number) {
    await this.findById(id);

    await this.databaseService.getPool().query(
      'DELETE FROM category WHERE category_id = ?',
      [id],
    );

    return {
      message: 'Category deleted successfully',
    };
  }
}
