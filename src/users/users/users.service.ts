import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from '../schema/user.schema';
import { UserRegister, UserLogin} from '../dto/user.dto';

@Injectable()
export class UsersService {


    constructor(@InjectModel(Users.name) private userModel: Model<Users>) { }


    async Create(req: UserRegister) {
        console.log("servive req", req);
        
        try {
            const loginRes = await this.userModel.findOne({ $or: [{ Email: req.Email }, { Mobile: req.MobileNum }] })
            console.log("loginRes", loginRes);
            
            if (loginRes) {
                return {
                    statusCode: HttpStatus.CONFLICT,
                    message: `User Already Exits with ${loginRes.Email} and ${loginRes.MobileNum}`
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
                            Email: registerRes.Email,
                            MobileNum: registerRes.MobileNum
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
    async Login(req: UserLogin) {
        try {

            const loginRes = await this.userModel.findOne({ $or: [{ Email: req.Email }, { MobileNum: req.MobileNum }] }).lean()
            if (loginRes) {
                if (loginRes.Password === req.Password) {

                    return {
                        statusCode: HttpStatus.OK,
                        message: "Login SuccessFully",
                        authentication: {
                            UserId: loginRes.UserId,
                            Email: loginRes.Email
                        }
                    }
                }

                return {
                    statusCode: HttpStatus.UNAUTHORIZED,
                    message: "Invalid Password"
                }

            }
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: "User Not Found"

            }
        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        }
    }
    async getUsers() {
        const users = await this.userModel.find().exec();
        return users;
    }
}
