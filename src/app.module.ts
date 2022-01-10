import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CardModule } from './card/card.module';
import { CategoryModule } from './category/category.module';
import { LabelModule } from './label/label.module';
import { ModifierModule } from './modifier/modifier.module';


@Module({
  imports: [UserModule, AuthModule, CardModule, CategoryModule, LabelModule, ModifierModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
