import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productRepo: Repository<Product>) {}

  async create(createProductDto: CreateProductDto) : Promise<Product> {
    return await this.productRepo.save(createProductDto);
  }

  async findOne(productId: number) : Promise<Product> {
    let product = await this.productRepo.findOne({where:{id:productId}});
    if(!product) 
      throw new NotFoundException("There is no product like this");
    return product;
  }
  
  async update(productId: number, updateProductDto: UpdateProductDto) : Promise<boolean> {
    await this.findOne(productId);
    await this.productRepo.update({id:productId},updateProductDto);
    return true;
  }
  
  async remove(productId: number) : Promise<boolean> {
    await this.findOne(productId);
    await this.productRepo.delete({id:productId});
    return true;
  }
}
