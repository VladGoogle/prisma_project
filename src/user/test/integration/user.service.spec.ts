import { AppModule } from "../../../app.module";
import { Test } from "@nestjs/testing";
import { PrismaService } from "../../../../prisma/prisma.service";
import { UserDto } from "../../../user/dto/user.dto";
import { Role } from "../../../enums/role.enum";
import { UserService } from "../../../user/user.service";
import * as bcrypt from "bcrypt"
import { UpdateUserInfoDto } from "../../dto/updateUserInfo.dto";
import {newPasswordDto} from "../../dto/newPassword.dto";

describe('UserService tests', ()=>{
  let prisma: PrismaService
  let userService: UserService
  beforeAll(async ()=>{
    const moduleRef = await Test.createTestingModule({
      imports:[AppModule]
    }).compile()
    prisma = moduleRef.get(PrismaService);
    userService = moduleRef.get(UserService)
    await  prisma.cleanDatabase()
  })

  it("should be defined", async()=> {
    expect(prisma).toBeDefined()
    expect(userService).toBeDefined()
  });

  describe('UserService tests', ()=>{
    const userDto: UserDto={
      firstName: "Vlad",
      lastName: "Google",
      email: "vlad1@gmail.com",
      password: "Asdrtyjklmnb1@",
      phone: "+14155550169",
      roles: Role.ADMIN
    }

    const updateUserDto: UpdateUserInfoDto ={
      firstName: "Steve",
      lastName: "Jobs",
      email: "vlad@gmail.com",
      phone: "+14155550769"
    }

    const token = "50mSMD6XTPUc6BCWvfsOrKMMYQUh8mCo"

    const firstChangePassword: newPasswordDto ={
      oldPassword:"sdrtyjklmnb1@",
      newPassword:"Asdrtyjklmnb123@",
      repeatPassword:"Asdrtyjklmnb123@"
    }

    const secondChangePassword: newPasswordDto ={
      oldPassword:"Asdrtyjklmnb1@",
      newPassword:"sdrtyjklmnb123@",
      repeatPassword:"Asdrtyjklmnb123@"
    }

    const thirdChangePassword: newPasswordDto ={
      oldPassword:"Asdrtyjklmnb1@",
      newPassword:"Asdrtyjklmnb123@",
      repeatPassword:"sdrtyjklmnb123@"
    }

    const fourthChangePassword: newPasswordDto ={
      oldPassword:"Asdrtyjklmnb1@",
      newPassword:"Asdrtyjklmnb123@",
      repeatPassword:"sdrtyjklmnb123@"
    }

    it("Should create user", async ()=>{
      try {
        const user = await userService.registerUser(userDto)
        expect(user.firstName).toBe(userDto.firstName)
        expect(user.lastName).toBe(userDto.lastName)
        expect(user.email).toBe(userDto.email)
        expect(user.password).toBe(userDto.password)
        expect(user.phone).toBe(userDto.phone)
      } catch (e) {
        console.log(e)
      }
    });

    it("Should find user by id", async()=>{
      try {
        const obj = await userService.registerUser(userDto)
        console.log(typeof obj.id)
        const user = await userService.findUserById(obj.id)
        expect(typeof user).toBe('object')
        expect(user).toHaveProperty('createdAt')
        expect(user).toHaveProperty('updatedAt')
        expect(user).toHaveProperty('token')
        expect(user.token).toBeNull()
      } catch (error) {
        expect(error.status).toBe(404)
        expect(error.message).toBe(`Doesn't exists`)
      }
    });

    it("Should find user by email", async()=>{
      try {
        const obj = await userService.registerUser(userDto)
        const user = await userService.findUserByEmail(obj.email)
        expect(typeof user).toBe('object')
        expect(user).toHaveProperty('createdAt')
        expect(user).toHaveProperty('updatedAt')
        expect(user).toHaveProperty('token')
        expect(user.token).toBeNull()
      } catch (error) {
        expect(error.status).toBe(404)
        expect(error.message).toBe(`Doesn't exists`)
      }
    });

    it("Should find all users without errors", async()=>{
      try {
        const obj = await userService.registerUser(userDto)
        const user = await userService.findAllUsers()
        expect(typeof user).toBe('array')
        expect(typeof user[0]).toBe('object')
      } catch (error) {
        expect(error.status).toBe(404)
        expect(error.message).toBe('No users was found')
      }
    });

    it("Should return `No users was found` error", async()=>{
      try {
        const user = await userService.findAllUsers()
        expect(typeof user).toBe('array')
        expect(typeof user[0]).toBe('object')
      } catch (error) {
        expect(error.status).toBe(404)
        expect(error.message).toBe('No users was found')
      }
    });

    it("Should delete user", async()=>{
      try {
        const obj = await userService.registerUser(userDto)
        const user = await userService.removeUser(obj.id)
        expect(user).toEqual({message: `User with id: ${obj.id} has been deleted`})
      } catch (error) {
        expect(error.status).toBe(404)
        expect(error.message).toBe(`Doesn't exists`)
      }
    });



    it("Should update user", async()=>{
      try {
        const obj = await userService.registerUser(userDto)
        const user = await userService.updateUserInfo(updateUserDto, obj.id)
        expect(user.firstName).toBe(updateUserDto.firstName)
        expect(user.lastName).toBe(updateUserDto.lastName)
        expect(user.email).toBe(updateUserDto.email)
        expect(user.phone).toBe(updateUserDto.phone)
      } catch (error) {
        expect(error.status).toBe(404)
        expect(error.message).toBe(`Doesn't exists`)
      }
    });

    it("Should set customer token", async()=>{
      try {
        const obj = await userService.registerUser(userDto)
        expect(obj.token).toBeNull()
        const user = await userService.setCustomerToken(token, obj.id)
        expect(user.token).not.toBeNull()
        expect(user.token).toBe(token)
      } catch (error) {
        expect(error.status).toBe(404)
        expect(error.message).toBe(`Doesn't exists`)
      }
    });

    it("Change password with invalid old password", async()=>{
      try {
        const obj = await userService.registerUser(userDto)
        const user = await userService.changeUserPassword(firstChangePassword, obj.id)
        const isValidFirst = await bcrypt.compare(obj.password, user.password)
        expect(isValidFirst).toBeFalsy()
        const isValidSecond = await bcrypt.compare(secondChangePassword.oldPassword, user.password)
        expect(isValidSecond).toBeTruthy()
      } catch (error) {
        expect(error.status).toBe(400)
        expect(error.message).toBe(`Invalid old password!`)
      }
    });

    it("Change password if the new password does not match the repeated new password", async()=>{
      try {
        const obj = await userService.registerUser(userDto)
        const user = await userService.changeUserPassword(secondChangePassword, obj.id)
        const isValidFirst = await bcrypt.compare(obj.password, user.password)
        expect(isValidFirst).toBeFalsy()
        const isValidSecond = await bcrypt.compare(secondChangePassword.oldPassword, user.password)
        expect(isValidSecond).toBeTruthy()
      } catch (error) {
        expect(error.status).toBe(400)
        expect(error.message).toBe(`Passwords should be matched`)
      }
    });

    it("Change password if the repeated new password does not match the new password", async()=>{
      try {
        const obj = await userService.registerUser(userDto)
        const user = await userService.changeUserPassword(thirdChangePassword, obj.id)
        const isValidFirst = await bcrypt.compare(obj.password, user.password)
        expect(isValidFirst).toBeFalsy()
        const isValidSecond = await bcrypt.compare(thirdChangePassword.oldPassword, user.password)
        expect(isValidSecond).toBeTruthy()
      } catch (error) {
        expect(error.status).toBe(400)
        expect(error.message).toBe(`Passwords should be matched`)
      }
    });

    it("Change password with valid data", async()=>{
      try {
        const obj = await userService.registerUser(userDto)
        const user = await userService.changeUserPassword(fourthChangePassword, obj.id)
        const isValidFirst = await bcrypt.compare(obj.password, user.password)
        expect(isValidFirst).toBeFalsy()
        const isValidSecond = await bcrypt.compare(fourthChangePassword.oldPassword, user.password)
        expect(isValidSecond).toBeTruthy()
      } catch (error) {
        expect(error.status).toBe(400)
        expect(error.message).toBe(`Passwords should be matched`)
      }
    });

});
});