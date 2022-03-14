import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CardModule } from './card/card.module';
import { CategoryModule } from './category/category.module';
import { LabelModule } from './label/label.module';
import { ModifierModule } from './modifier/modifier.module';
import { ProductModule } from './product/product.module';
import { ModtoprodModule } from './modtoprod/modtoprod.module';
import { ProdorderModule } from './prodorder/prodorder.module';
import { OrderModule } from './order/order.module';
import { TransactionModule } from './transaction/transaction.module';
import { StripeModule } from './stripe/stripe.module';


@Module({
  imports: [UserModule, AuthModule, CardModule, CategoryModule, LabelModule, ModifierModule, ProductModule, ModtoprodModule, ProdorderModule, OrderModule, StripeModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
