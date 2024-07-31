import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IsAdminGuard } from '../user/guards/is-admin.guard';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(IsAdminGuard)
  @UsePipes(ValidationPipe)
  create(@Body() createProductDto: CreateProductDto) : Promise<Product> {
    return this.productsService.create(createProductDto);
  }
  
  @Get(':productId')
  async findOne(@Param('productId',ParseIntPipe) productId: number) : Promise<Product> {
    return this.productsService.findOne(productId);
  }
  
  @Patch(':productId')
  @UseGuards(IsAdminGuard)
  @UsePipes(ValidationPipe)
  update(@Param('productId',ParseIntPipe) productId: number, @Body() updateProductDto: UpdateProductDto) : Promise<boolean> {
    return this.productsService.update(productId, updateProductDto);
  }

  @Delete(':productId')
  @UseGuards(IsAdminGuard)
  remove(@Param('productId',ParseIntPipe) productId: number) : Promise<boolean> {
    return this.productsService.remove(productId);
  }
}
