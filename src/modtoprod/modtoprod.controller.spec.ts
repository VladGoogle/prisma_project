import { Test, TestingModule } from '@nestjs/testing';
import { ModtoprodController } from './modtoprod.controller';

describe('ModtoprodController', () => {
  let controller: ModtoprodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModtoprodController],
    }).compile();

    controller = module.get<ModtoprodController>(ModtoprodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
