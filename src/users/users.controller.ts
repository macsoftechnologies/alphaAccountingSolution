import { Controller, Body, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from '../users/users/users.service';
import { UserRegister} from '../users/dto/user.dto'

@Controller('users')
export class UsersController {

    constructor(private UsersService : UsersService){}
    
    @Post('/register')
    async create(@Body() req : UserRegister){
         try {
            const result = await this.UsersService.Create(req)
            return result
         } catch (error) {
                return {
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: error.message,
                };
         }

    }
}
