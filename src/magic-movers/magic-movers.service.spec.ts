import { Test, TestingModule } from '@nestjs/testing';
import { MagicMoversService } from './magic-movers.service';

describe('MagicMoversService', () => {
  let service: MagicMoversService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MagicMoversService],
    }).compile();

    service = module.get<MagicMoversService>(MagicMoversService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
