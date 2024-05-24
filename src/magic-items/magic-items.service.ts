import { NotFoundException, Injectable, ConflictException } from '@nestjs/common';
import { CreateMagicItemDto } from './dto/create-magic-item.dto';
import { UpdateMagicItemDto } from './dto/update-magic-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MagicItem } from './entities/magic-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MagicItemsService {
  constructor(@InjectRepository(MagicItem) private magicItemRepo: Repository<MagicItem>){}
  
  async create(createMagicItemDto: CreateMagicItemDto) : Promise<MagicItem> {
    return await this.magicItemRepo.save(createMagicItemDto);
  }

  async findAll() : Promise<MagicItem[]> {
    return await this.magicItemRepo.find();
  }

  async findOne(id: number) : Promise<MagicItem> {
    const item = await this.magicItemRepo.findOne({where:{id}});
    if (!item) {
      throw new NotFoundException("There is no item such that " + id);
    }
    return item;
  }

  async update(id: number, updateMagicItemDto: UpdateMagicItemDto) : Promise<MagicItem> {
    let item = await this.findOne(id);
    item = {...item,...updateMagicItemDto};
    return await this.magicItemRepo.save(item);
  }

  async remove(id: number) : Promise<MagicItem> {
    const item = await this.findOne(id);
    return await this.magicItemRepo.remove(item);
  }

  async calcAllPower(itemsIds: number[]) : Promise<[number,MagicItem[]]> {
    const magicItems: MagicItem[] = [];
    let neededPower: number = 0;
    for (const itemId of itemsIds) {
      const magicItem: MagicItem = await this.findOne(itemId);

      neededPower += magicItem.weight;
      magicItems.push(magicItem);
    }
    return [neededPower,magicItems];
  }
}
