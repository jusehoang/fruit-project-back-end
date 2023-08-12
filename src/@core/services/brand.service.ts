import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Brand } from "../entities/brand.entity";
import { BrandRequest, BrandRequestUpdate } from "../models/brand.model";
import { Pagenation } from "../models/pagination.model";

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly categoryRepository: Repository<Brand>
  ) { }

  async create(brandRequest: BrandRequest) {
    try {
      const category = this.categoryRepository.create(brandRequest);

      return await this.categoryRepository.save(category);
    } catch (error) {
      return error;
    }
  }

  async getCategoryById(id: string) {
    try {
      const category = await this.categoryRepository.findOne(id);

      if (!category) {
        throw new HttpException('Category not found!', HttpStatus.NOT_FOUND);
      }

      return category;
    } catch (error) {
      return error;
    }
  }

  async getCategory(page?: number, size?: number) {
    try {
      let brands: Brand[];
      if (!page) {
        page = 0;
      }
      const offset = (page - 1) * size;
      if (!size) {
        brands = await this.categoryRepository.find();
      }
      const query = this.categoryRepository.createQueryBuilder('brand')
        .orderBy('brand.id', 'ASC')
        .skip(offset)
        .take(size)

      const [listBrand, total] = await query.getManyAndCount();
      const data: Pagenation<Brand> = {
        items: brands ? brands : listBrand,
        total: brands ? brands.length : total,
        size: brands ? brands.length : listBrand.length < size ? listBrand.length : Number(size)
      }
      return data;
    } catch (error) {
      return error;
    }
  }

  async update(brand: BrandRequestUpdate) {
    try {
      return await this.categoryRepository.update(brand.id, brand);
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
    try {
      return await this.categoryRepository.delete(id);
    } catch (error) {
      return error;
    }
  }
}