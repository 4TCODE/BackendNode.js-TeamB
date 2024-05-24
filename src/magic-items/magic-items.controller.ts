import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { MagicItemsService } from './magic-items.service';
import { CreateMagicItemDto } from './dto/create-magic-item.dto';
import { UpdateMagicItemDto } from './dto/update-magic-item.dto';
import { MagicItem } from './entities/magic-item.entity';

@Controller('magic-items')
export class MagicItemsController {
  constructor(private readonly magicItemsService: MagicItemsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createMagicItemDto: CreateMagicItemDto) : Promise<MagicItem> {
    return await this.magicItemsService.create(createMagicItemDto);
  }

  @Get()
  async findAll() : Promise<MagicItem[]> {
    return await this.magicItemsService.findAll();
  }

  @Get(':itemId')
  async findOne(@Param('itemId',ParseIntPipe) itemId: number) : Promise<MagicItem> {
    return await this.magicItemsService.findOne(itemId);
  }

  @Patch(':itemId')
  @UsePipes(ValidationPipe)
  update(@Param('itemId',ParseIntPipe) itemId: number, @Body() updateMagicItemDto: UpdateMagicItemDto) {
    return this.magicItemsService.update(itemId, updateMagicItemDto);
  }

  @Delete(':itemId')
  remove(@Param('itemId',ParseIntPipe) itemId: number) {
    return this.magicItemsService.remove(itemId);
  }
}
