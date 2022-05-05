import { Test, TestingModule } from '@nestjs/testing';
import { ModToProdToOrderController } from './modtoprodtoorder.controller';

describe('ModtoprodtoorderController', () => {
  let controller: ModToProdToOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModToProdToOrderController],
    }).compile();

    controller = module.get<ModToProdToOrderController>(ModToProdToOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
