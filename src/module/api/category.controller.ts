import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from "@nestjs/common";
import { Role, Roles } from "src/@core/decorators/roles.decorator";
import { BrandRequest, BrandRequestUpdate } from "src/@core/models/brand.model";
import { CategoryService } from "src/@core/services/brand.service";

@Controller('category')
@Roles(Role.Admin)
export class CategoryController {
  constructor(
    private readonly brandService: CategoryService
  ) {}

  @Post()
  @HttpCode(200)
  create(@Body() brand: BrandRequest) {
    return this.brandService.create(brand);
  }

  @Get()
  @HttpCode(200)
  getById(@Query('id') id: string) {
    return this.brandService.getCategoryById(id);
  }

  @Get('all')
  @HttpCode(200)
  getAll() {
    return this.brandService.getAllCategory();
  }

  @Put()
  @HttpCode(200)
  update(@Body() brand: BrandRequestUpdate) {
    this.brandService.update(brand);
  }

  @Delete()
  @HttpCode(200)
  delete(@Query('id') id: string) {
    return this.brandService.remove(id);
  }
}