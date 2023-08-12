import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from "@nestjs/common";
import { PublicApi } from "src/@core/decorators/public-api.decorator";
import { Role, Roles } from "src/@core/decorators/roles.decorator";
import { BrandRequest, BrandRequestUpdate } from "src/@core/models/brand.model";
import { BrandService } from "src/@core/services/brand.service";

@PublicApi()
@Controller('brand')
// @Roles(Role.Admin)
export class BrandController {
  constructor(
    private readonly brandService: BrandService
  ) {}

  @Post()
  @HttpCode(200)
  create(@Body() brand: BrandRequest) {
    return this.brandService.create(brand);
  }

  @Get()
  @HttpCode(200)
  getAll(@Query('page') page?: number, @Query('size') size?: number) {
    return this.brandService.getCategory(page, size);
  }

  @Get()
  @HttpCode(200)
  getById(@Query('id') id: string) {
    return this.brandService.getCategoryById(id);
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