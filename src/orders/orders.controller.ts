import { Controller,  Body, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Res, Delete } from '@nestjs/common';
import { productOrder } from './dto/orders.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) { }
    @Post('/register')
    async create(@Body() req: productOrder) {
        try {
            const result = await this.ordersService.Create(req)
            console.log("result", result);
            
            return result
        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        }

    }

}
