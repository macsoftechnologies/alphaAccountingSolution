import { Controller, Body, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from '../users/users/users.service';
import { UserRegister, UserLogin } from '../users/dto/user.dto';

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
}
