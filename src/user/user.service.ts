import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.servise';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async registerUser(data: UserDto) {
    return await this.prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        type: data.type,
      },
    });
  }

  async findUserById(id: number) {
    return await this.prisma.user.findFirst({
      where: { id: id },
      include:{

      }
    });
  }

  async findUserByEmail(email:string){
    return await  this.prisma.user.findFirst({
      where:{email:email}
    })
  }

  async findAllUsers(){
    return await this.prisma.user.findMany()
  }

  async removeUser(id:number){
    return await  this.prisma.user.delete({
      where:{id:id}
    })
  }

  async updateUserInfo (data: UserDto, id:number) {
    return await this.prisma.user.update({
      where:{id: id},
      data:{
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        type: data.type,
      }
    })
  }

}
