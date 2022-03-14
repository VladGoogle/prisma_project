import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CardDto } from "./dto/card.dto";
import { ErrorHandlers } from "../middlewares/error.handlers";
@Injectable()
export class CardService {
  constructor(private prisma: PrismaService,
              private errorHandler: ErrorHandlers) {}

  async createCard(data: CardDto) {
    return await this.prisma.card.create({
      data: {
        externalId: data.externalId,
        userId: data.userId
      },
    });
  }


  async findCardById (id:number){
    const card = await  this.prisma.card.findUnique({
      where:{id:id},
      include:{
        user: true,
        transactions: true
      }
    });
    await  this.errorHandler.NotFoundError(card)
    return card;
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


