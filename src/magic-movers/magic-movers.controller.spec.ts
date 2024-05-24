import { Test, TestingModule } from '@nestjs/testing';
import { MagicMoversController } from './magic-movers.controller';
import { MagicMoversService } from './magic-movers.service';

describe('MagicMoversController', () => {
  let controller: MagicMoversController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MagicMoversController],
      providers: [MagicMoversService],
    }).compile();

    controller = module.get<MagicMoversController>(MagicMoversController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
