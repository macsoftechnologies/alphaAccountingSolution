import { Controller, Body, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Res, Delete } from '@nestjs/common';
import { UsersService } from '../users/users/users.service';
import { UserRegister, UserLogin, MobileNumberDto, VerifyOtpDto, UserUpdate, DeleteUser} from '../users/dto/user.dto';
import { Response } from 'express';
import moment = require('moment');

@Controller('users')
export class UsersController {

    constructor(private UsersService: UsersService) { }

    @Post('/register')
    async create(@Body() req: UserRegister) {
        try {
            const result = await this.UsersService.Create(req)
            console.log("result", result);
            
            return result
        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        }

    }

    @Post('/login')
    async login(@Body() req: UserLogin) {
        try {
            const result = await this.UsersService.Login(req)
            return result
        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        }

    }

    @Get('/admin')
    async getAllUsers(){
        const users = await this.UsersService.getUsers();
        return users;
    }

    @Get('/userdetails')
    async userDetails(@Query('Email') Email : string) {
        console.log(Email)
        try {
            const response = await this.UsersService.UserDetails(Email)
            return response
        } catch (error) {
            return {
                StatusCode : HttpStatus.INTERNAL_SERVER_ERROR,
                Message : error
            }
        }
    }
  
      // Generate OTP

  @Post('/generateOTP')
  async generateOTP(@Body() body:  MobileNumberDto, @Res() res: Response) {
    try {
      const min = 100000,
        max = 999999;

      const params = {
        otp: (Math.random() * (max - min) + min).toString().split('.')[0],
        otpExpiryTime: moment()
          .add(5, 'minutes')
          .format(),
      };
      let response = await this.UsersService.update(
        {
          MobileNum: body.MobileNum,
          isDeleted: false,
        },
        params,
      );

      if (response.statusCode == HttpStatus.OK) {
        return res.status(response.statusCode).send({
          ...response,
          message: 'Otp sent to your registered mobile number',
        });
      } else if (response.statusCode == HttpStatus.NOT_FOUND) {
        return res.status(response.statusCode).send({
          ...response,
          message: body.MobileNum + ' not registered',
        });
      } else {
        return res.status(response.statusCode).send(response);
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      });
    }
  }
 
/* @Put('/userupdate')
  async userUpdate(@Query('userID') UserId : string) {
      console.log(UserId)
      try {
          const response = await this.UsersService.userUpdate(UserId)
          return response
      } catch (error) {
          return {
              StatusCode : HttpStatus.INTERNAL_SERVER_ERROR,
              Message : error
          }
      }
  } 

  @Delete('/userDelete')
  remove(@Query('userId') UserId: string) {
    console.log("controller", UserId)
    return this.UsersService.remove(UserId);
  }*/

  @Delete('/delete')
  async deleteBlog(@Body() req: DeleteUser) { 
    try {
      let response = await this.UsersService.delete(req);

      return response
    } catch (error) {
      return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
      };
    }
  }
}

    
