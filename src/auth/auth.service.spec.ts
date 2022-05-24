import { AppModule } from "../app.module";
import { Test } from "@nestjs/testing";
import { PrismaService } from "../../prisma/prisma.service";
import { UserDto } from "../user/dto/user.dto";
import { Role } from "../enums/role.enum";

describe('AuthService tests', ()=>{
  let prisma: PrismaService
  beforeAll(async ()=>{
    const moduleRef = await Test.createTestingModule({
      imports:[AppModule]
    }).compile()
    prisma = moduleRef.get(PrismaService)
    await  prisma.cleanDatabase()
  })

  describe('Register user', ()=>{
    const userDto: UserDto={
      firstName: "Vlad",
      lastName: "Google",
      email: "vlad1@gmail.com",
      password: "Asdrtyjklmnb1@",
      phone: "+14155550169",
      roles: Role.ADMIN
    }
    it("Create user", async ()=>{
      const user = await prisma.user.create({
        data: {
          firstName: "Vlad",
          lastName: "Google",
          email: "vlad1@gmail.com",
          password: "Asdrtyjklmnb1@",
          phone: "+14155550169",
          roles: "ADMIN"
        }
      })
     expect(user.roles).toBe(Role.ADMIN)
    });
  })

  describe('Login', ()=>{

  })
  it.todo('should pass')
});