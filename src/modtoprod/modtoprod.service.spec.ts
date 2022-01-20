import { Test, TestingModule } from '@nestjs/testing';
import { ModtoprodService } from './modtoprod.service';

describe('ModtoprodService', () => {
  let service: ModtoprodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModtoprodService],
    }).compile();

    service = module.get<ModtoprodService>(ModtoprodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
