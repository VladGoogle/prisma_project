import { AppModule } from "../../../app.module";
import { Test } from '@nestjs/testing';

describe('AuthService tests', ()=>{
  beforeAll(async ()=>{
    const moduleRef = await Test.createTestingModule({
      imports:[AppModule]
    })
  })
  it.todo('should pass')
});