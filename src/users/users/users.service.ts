import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from '../schema/user.schema';
import { UserRegister } from '../dto/user.dto';

@Injectable()
export class UsersService {


    constructor(@InjectModel(Users.name) private userModel: Model<Users>) { }


    async Create(req: UserRegister) {
        try {
            const loginRes = await this.userModel.findOne({ $or: [{ Email: req.Email }, { Mobile: req.MobileNum }] })
            
            if (loginRes) {
                return {
                    statusCode: HttpStatus.CONFLICT,
                    message: `User Already Exit with ${loginRes.Email} and ${loginRes.Mobile}`
                }
            }

            const registerRes = await this.userModel.create(req)
            if (registerRes) {
                return {
                    statusCode: HttpStatus.OK,
                    message: "Registered SuccessFully",
                    data: {
                        authentication: {
                            UserId: registerRes.UserId,
                            Email: registerRes.Email
                        }
                    }
                }

            }
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: "Invalid Request"
            }

        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        }
    }
}
