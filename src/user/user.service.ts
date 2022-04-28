import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from '../../prisma/prisma.service';
import { UserDto } from "./dto/user.dto";
import { newPasswordDto } from "./dto/newPassword.dto";
import * as bcrypt from 'bcrypt';
import { ErrorHandlers } from "../middlewares/error.handlers";

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private errorHandler: ErrorHandlers) {}

  async registerUser(data: UserDto) {
    return await this.prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        roles: data.roles
      },
    });
  }

  async findUserById(id: number) {
    const user = await this.prisma.user.findFirst({
      where: { id: id },
      include:{
        card:true,
        orders:true
      }
    });
    await this.errorHandler.NotFoundError(user)

    return user;
  }

  async findUserByEmail(email:string){
    const user =  await  this.prisma.user.findFirst({
      where:{
        email:email
      },
      include:{
        card:true,
        orders:true
      }
    })
    await this.errorHandler.NotFoundError(user)

    return user;
  }

  async findAllUsers(){
    return await this.prisma.user.findMany({
      include:{
        card:true,
        orders:true
      }
    })
  }

  async removeUser(id:number){
    const user =  await  this.prisma.user.delete({
      where:{id:id}
    })
    await this.errorHandler.NotFoundError(user)
  }

  async updateUserInfo (data: UserDto, id:number) {
    const user = await this.prisma.user.update({
      where:{id: id},
      data:{
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        roles: data.roles,
      }
    })
    await this.errorHandler.NotFoundError(user)

    return user;
  }

  async setCustomerToken (token: string, id:number) {
    const user = await this.prisma.user.update({
      where:{id: id},
      data:{
        token: token
      }
    })
    await this.errorHandler.NotFoundError(user)
    return user;
  }

  async changeUserPassword(data: newPasswordDto, id:number) {
    const user = await  this.prisma.user.findUnique({
      where:{id:id}
    })
    await this.errorHandler.NotFoundError(user)

    const isValid = await bcrypt.compare(data.oldPassword, user.password)

    if(!isValid){
      throw new BadRequestException(`Invalid old password!`)
    }

    if(data.newPassword!=data.repeatPassword){
      throw new BadRequestException(`Passwords should be matched`)
    }

    if(data.repeatPassword!=data.newPassword){
      throw new BadRequestException(`Passwords should be matched`)
    }


    return await this.prisma.user.update({
      where:{id: id},
      data:{
        password: await bcrypt.hash(data.newPassword, 10)
      }
    })

  }

}
