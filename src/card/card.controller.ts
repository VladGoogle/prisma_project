import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CardDto } from "./dto/card.dto";
import { CardService } from "./card.service";
import { AuthGuard } from "@nestjs/passport";

@Controller()
export class CardController {
  constructor(private cardService: CardService) {}

  @Post('user/:id/card')
  async createCard(@Body() data:CardDto){
    return await  this.cardService.createCard(data)
  }

  @Get('card/:id')
  async getCardById(@Param('id') id: string) {
    const cardId = parseInt(id);
    return await this.cardService.findCardById(cardId);
  }

  @Get('card')
  @UseGuards(AuthGuard('jwt'))
  async getAllCards() {
    return await  this.cardService.findAllCards()
  }


  @Delete('card/:id')
  async deleteCard(@Param('id') id:string){
    const cardId = parseInt(id)
    return await  this.cardService.deleteCard(cardId)
  }
}
