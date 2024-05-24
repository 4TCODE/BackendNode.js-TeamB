import { Module } from '@nestjs/common';
import { MagicItemsService } from './magic-items.service';
import { MagicItemsController } from './magic-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MagicItem } from './entities/magic-item.entity';

@Module({
  controllers: [MagicItemsController],
  providers: [MagicItemsService],
  imports: [TypeOrmModule.forFeature([MagicItem])],
  exports: [MagicItemsService]
})
export class MagicItemsModule {}
