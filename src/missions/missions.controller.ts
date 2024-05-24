import { Controller, Get, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { MissionsService } from './missions.service';
import { Mission } from './entities/mission.entity';
import { MagicItem } from '../magic-items/entities/magic-item.entity';

@Controller('missions')
export class MissionsController {
  constructor(private readonly missionsService: MissionsService) {}

  @Get()
  async findAll() : Promise<Mission[]> {
    return await this.missionsService.findAll();
  }

  @Get(':missionId')
  async findOne(@Param('missionId',ParseIntPipe) missionId: number) : Promise<Mission> {
    return await this.missionsService.findOne(missionId);
  }
  
  @Get('items/:missionId')
  async findItemsForMission(@Param('missionId',ParseIntPipe) missionId: number) : Promise<MagicItem[]> {
    return await this.missionsService.findAllItemsToMission(missionId);
  }

  @Delete(':missionId')
  async remove(@Param('missionId',ParseIntPipe) missionId: number) : Promise<boolean> {
    return await this.missionsService.remove(missionId);
  }
}
