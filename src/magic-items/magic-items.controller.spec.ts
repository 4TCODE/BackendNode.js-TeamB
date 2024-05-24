import { Test, TestingModule } from '@nestjs/testing';
import { MagicItemsController } from './magic-items.controller';
import { MagicItemsService } from './magic-items.service';

describe('MagicItemsController', () => {
  let controller: MagicItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MagicItemsController],
      providers: [MagicItemsService],
    }).compile();

    controller = module.get<MagicItemsController>(MagicItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
