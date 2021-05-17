import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { Users } from 'src/users/schema/user.schema';
@Injectable()
export class AdminService {
 constructor(@InjectModel(Users.name) private userModel: Model<Users>) { }

 //List of Users for product 
 async listUsers() {
        const users = await this.userModel.find().exec();
        return users;
    }

}
