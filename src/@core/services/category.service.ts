import { Pagenation } from './../models/pagination.model';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "../entities/category.entity";
import { CategoryRequest } from "../models/category.model";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async createCategory(data: CategoryRequest) {
    let category;
    try {
      category = this.categoryRepository.create(data);
      category = await this.categoryRepository.save(category);
      return category;
    } catch (error) {
      return error;
    }
  }

  async updateCategory(id: number, data: CategoryRequest) {
    try {
      let category = await this.categoryRepository.findOne(id);
      if (!category) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
      const update = await this.categoryRepository.update(id, data);
      return update;
    } catch (error) {
      return error;
    };
  }

  async getCategoryById(id: number) {
    try {
      let category = await this.categoryRepository.findOne(id);
      if (!category) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      return error;
    }
  }

  async getAllCategory(page: number, size: number) {
    try {
      const offset = (page - 1) * size;
      const [items, count] = await this.categoryRepository.createQueryBuilder('category')
      .orderBy('category.id', "ASC")
      .skip(offset)
      .take(size)
      .getManyAndCount();
      const data: Pagenation<Category> = {
        items: items,
        size: items.length,
        total: count
      }
      return data;
    } catch (error) {
      return error;
    }
  }
}