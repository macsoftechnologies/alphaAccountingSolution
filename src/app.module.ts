import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { MongooseConfigService } from './_common/configs/mongoose.config';
//import { UsersController } from './users/users.controller';
//import { UsersService } from './users/users/users.service';
@Module({
  imports: [
    MongooseModule.forRootAsync({useClass : MongooseConfigService}),
    UserModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
