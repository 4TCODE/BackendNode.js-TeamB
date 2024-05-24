import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mission } from './entities/mission.entity';
import { DataSource, Repository } from 'typeorm';
import { MagicMover } from '../magic-movers/entities/magic-mover.entity';
import { MagicItem } from '../magic-items/entities/magic-item.entity';
import { ItemsToMissions } from './entities/items-to-missions.dto';
import { MagicItemsService } from '../magic-items/magic-items.service';
import { MissionDate } from '../utils/types';

@Injectable()
export class MissionsService {
  constructor(
    @InjectRepository(Mission) private missionRepo: Repository<Mission>,
    @InjectRepository(ItemsToMissions) private itemsToMissionRepo: Repository<ItemsToMissions>,
    private readonly magicItemsService: MagicItemsService
  ){}

  async create(magicMover: MagicMover) : Promise<number> {
    const mission: Mission = await this.missionRepo.save({magicMover});
    return mission.id;
  }

  async findAll() : Promise<Mission[]> {
    return await this.missionRepo.find();
  }

  async findOne(missionId: number) : Promise<Mission> {
    let mission = await this.missionRepo.findOne({
      where: {id:missionId},
      relations: {magicMover: true}
    });
    if (!mission) {
      throw new NotFoundException("There is no mission like that "+ missionId);
    }
    return mission;
  }
  
  async setMissionDate(missionId: number, date: MissionDate) {
    const mission: Mission = await this.findOne(missionId);
    if (date.start) {
      mission.start = date.start;
    }
    if (date.end) {
      mission.end = date.end;
    }
    await this.missionRepo.save(mission);
  }

  async removeItemsFromMission(missionId: number) : Promise<number> {
    const mission: Mission = await this.findOne(missionId);
    const magicItems: MagicItem[] = await this.findAllItemsToMission(missionId);
    let power: number = 0;
    magicItems.map(magicItem => {power+=magicItem.weight});
    await this.itemsToMissionRepo.delete({mission});
    return power;
  }
  
  async remove(missionId: number) : Promise<boolean> {
    let mission : Mission = await this.findOne(missionId);
    await this.missionRepo.remove(mission);
    return true;
  }

  async addItemsToMission(missionId: number,magicItems: MagicItem[]) {
    const mission : Mission = await this.findOne(missionId);
    for (const magicItem of magicItems) {
      await this.itemsToMissionRepo.insert({mission,magicItem});
    }
    return true;
  }

  async findAllItemsToMission(missionId: number) : Promise<MagicItem[]> {
    const mission : Mission = await this.findOne(missionId);
    const all = await this.itemsToMissionRepo.find({
      where: {mission},
      relations: {magicItem: true}
    });
    let magicItems : MagicItem[] = [];
    for (const iterator of all) {
      magicItems.push(iterator.magicItem);
    }
    return magicItems;
  }
}
