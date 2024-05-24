import { Test, TestingModule } from '@nestjs/testing';
import { MagicItemsService } from './magic-items.service';

describe('MagicItemsService', () => {
  let service: MagicItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MagicItemsService],
    }).compile();

    service = module.get<MagicItemsService>(MagicItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
