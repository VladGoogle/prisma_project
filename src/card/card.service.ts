import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CardDto } from "./dto/card.dto";
@Injectable()
export class CardService {
  constructor(private prisma: PrismaService) {}

  async createCard(data: CardDto) {
    return await this.prisma.card.create({
      data: {
        externalId: data.externalId,
        userId: data.userId
      },
    });
  }


  async findCardById (id:number){
    return await  this.prisma.card.findUnique({
      where:{id:id},
      include:{
        user: true,
        transactions: true
      }
    });
  }


  async findAllCards(){
    return await  this.prisma.card.findMany({
      include:{
        user: true,
        transactions: true
      }
      }
    )
  }


  async deleteCard(id: number){
    return await this.prisma.card.delete({
      where:{id:id},
      include: {
          user:true,
          transactions:true
        }
    })
  }

}


