import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMagicMoverDto } from './dto/create-magic-mover.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MagicMover } from './entities/magic-mover.entity';
import { Repository } from 'typeorm';
import { MagicMoverStatus } from '../utils/types';
import { MagicItemsService } from '../magic-items/magic-items.service';
import { MissionsService } from '../missions/missions.service';
import { getMinutes } from '../utils/helpers';

@Injectable()
export class MagicMoversService {
  constructor(
    @InjectRepository(MagicMover) private magicMoverRepo: Repository<MagicMover>,
    private readonly magicItemsService: MagicItemsService,
    private readonly missionsService: MissionsService
  ) {}
  
  async create(createMagicMoverDto: CreateMagicMoverDto) : Promise<MagicMover> {
    let {name,totalEnergy,weightLimit,rateOfEnergyIncrease} = createMagicMoverDto;
    let magicMover : Partial<MagicMover> = {
      name,totalEnergy,weightLimit,rateOfEnergyIncrease,
      availableEnergy:totalEnergy,availableWeight:weightLimit
    };
    return await this.magicMoverRepo.save(magicMover);
  }

  async getMostActiveMovers() : Promise<MagicMover[]> {
    return await this.magicMoverRepo.find({
      order:{completedMissions:'DESC'},
      select:{id:true,name:true,completedMissions:true}
    });
  }

  async findAll() : Promise<MagicMover[]> {
    return await this.magicMoverRepo.find();
  }

  async findOne(moverId: number) : Promise<MagicMover> {
    let magicMover = await this.magicMoverRepo.findOne({where:{id:moverId}});
    if (!magicMover) {
      throw new NotFoundException("There is no Magic Mover like that "+ moverId);
    }
    return magicMover;
  }

  async startAMission(moverId: number) : Promise<boolean> {
    const magicMover: MagicMover = await this.findOne(moverId);
    if (magicMover.state == MagicMoverStatus.ON_A_MISSION) {
      throw new ConflictException("The magic mover is already on a mission");
    }
    else if (!magicMover.missionId) {
      throw new ConflictException("There is no mission to start");
    }

    magicMover.state = MagicMoverStatus.ON_A_MISSION;
    await this.missionsService.setMissionDate(magicMover.missionId,{start:new Date(Date.now())});
    await this.magicMoverRepo.save(magicMover);
    
    return true;
  }

  async endAMission(moverId: number) : Promise<boolean> {
    const magicMover: MagicMover = await this.findOne(moverId);
    if (!magicMover.missionId) {
      throw new ConflictException("There is no mission to end");
    }

    await this.missionsService.setMissionDate(magicMover.missionId,{end:new Date(Date.now())});
    magicMover.state = MagicMoverStatus.DONE;
    magicMover.missionId = 0;
    magicMover.completedMissions += 1;
    magicMover.availableWeight = magicMover.weightLimit;
    await this.magicMoverRepo.save(magicMover);

    return true;
  }
  
  async resting(moverId: number) : Promise<boolean> {
    const magicMover: MagicMover = await this.findOne(moverId);
    switch (magicMover.state) {
      case MagicMoverStatus.LOADING:
        throw new ConflictException("The magic mover is on the loading phase, make sure to unload it");
      case MagicMoverStatus.ON_A_MISSION:
        throw new ConflictException("The magic mover is on a mission now!");
      case MagicMoverStatus.RESTING:
        throw new ConflictException("The magic mover is already in the resting phase now!");
      default:
        break;
    }

    magicMover.state = MagicMoverStatus.RESTING;
    magicMover.lastResting = new Date(Date.now());
    await this.magicMoverRepo.save(magicMover);
    return true;
  }

  async load(moverId: number, itemsIds: number[]) : Promise<boolean> {
    const magicMover = await this.findOne(moverId);
    if (magicMover.state == MagicMoverStatus.ON_A_MISSION) {
      throw new ConflictException("The magic mover is on a mission.");
    }
    else if (magicMover.state == MagicMoverStatus.RESTING) {
      let minuets = getMinutes(Date.now()) - getMinutes(magicMover.lastResting.getTime());
      magicMover.availableEnergy += minuets*magicMover.rateOfEnergyIncrease;
      if (magicMover.availableEnergy > magicMover.totalEnergy) {
        magicMover.availableEnergy = magicMover.totalEnergy;
      }
    }

    if (!magicMover.missionId) {
      const missionId: number = await this.missionsService.create(magicMover);
      magicMover.missionId = missionId;
    }
    
    const [neededPower,magicItems] = await this.magicItemsService.calcAllPower(itemsIds);
    
    if (magicMover.availableEnergy < neededPower || magicMover.availableWeight < neededPower) {
      throw new ConflictException("There is no enough Energy OR Weight to carry the items");
    }

    await this.missionsService.addItemsToMission(magicMover.missionId,magicItems);
    magicMover.availableEnergy -= neededPower;
    magicMover.availableWeight -= neededPower;
    magicMover.state = MagicMoverStatus.LOADING;

    await this.magicMoverRepo.save(magicMover);
    return true;
  }

  async unload(moverId: number) : Promise<boolean> {
    const magicMover: MagicMover = await this.findOne(moverId);
    if (magicMover.state != MagicMoverStatus.LOADING) {
      throw new ConflictException("The magic mover isn't on loading phase now");
    }
    let power: number = await this.missionsService.removeItemsFromMission(magicMover.missionId as number);
    magicMover.availableEnergy += power;
    magicMover.availableWeight = magicMover.weightLimit;
    magicMover.state = MagicMoverStatus.DONE;
    await this.magicMoverRepo.save(magicMover);
    return true;
  }

  async remove(moverId: number) {
    let magicMover = await this.findOne(moverId);
    return await this.magicMoverRepo.remove(magicMover);
  }
}
