import { Module } from '@nestjs/common';
import { MagicMoversService } from './magic-movers.service';
import { MagicMoversController } from './magic-movers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MagicMover } from './entities/magic-mover.entity';
import { MagicItemsModule } from '../magic-items/magic-items.module';
import { MissionsModule } from '../missions/missions.module';

@Module({
  imports: [TypeOrmModule.forFeature([MagicMover]),MagicItemsModule,MissionsModule],
  controllers: [MagicMoversController],
  providers: [MagicMoversService],
})
export class MagicMoversModule {}
