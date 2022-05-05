import { Test, TestingModule } from '@nestjs/testing';
import { ModtoprodtoorderService } from './modtoprodtoorder.service';

describe('ModtoprodtoorderService', () => {
  let service: ModtoprodtoorderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModtoprodtoorderService],
    }).compile();

    service = module.get<ModtoprodtoorderService>(ModtoprodtoorderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
