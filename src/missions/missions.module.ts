import { Module } from '@nestjs/common';
import { MissionsService } from './missions.service';
import { MissionsController } from './missions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsToMissions } from './entities/items-to-missions.dto';
import { Mission } from './entities/mission.entity';
import { MagicItemsModule } from '../magic-items/magic-items.module';

@Module({
  controllers: [MissionsController],
  providers: [MissionsService],
  imports: [TypeOrmModule.forFeature([ItemsToMissions,Mission]),MagicItemsModule],
  exports: [MissionsService]
})
export class MissionsModule {}
