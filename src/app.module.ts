import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product/product.module';
import { UserModule } from './users/user.module';
import { MongooseConfigService } from './_common/configs/mongoose.config';
import { OrdersModule } from './orders/orders.module';
import { PartnersModule } from './partners/partners.module';
import { AdminModule } from './admin/admin.Module';
import { SeviceController } from './rating/sevice/sevice.controller';
@Module({
  imports: [
    MongooseModule.forRootAsync({useClass : MongooseConfigService}),
    UserModule,
    ProductModule,
    OrdersModule,
    PartnersModule,
    AdminModule
    ],
  controllers: [AppController, SeviceController],
  providers: [AppService]
})
export class AppModule {}
