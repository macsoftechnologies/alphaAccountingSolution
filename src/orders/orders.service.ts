import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { productOrder } from './dto/orders.dto';
import { order } from './dto/schema/order.schema';
@Injectable()
export class OrdersService {
    
    constructor(@InjectModel(order.name) private orderModel: Model<order>) { }


    async Create(req: productOrder) {
        try {
            const orderRes = await this.orderModel.create(req)
            if (orderRes) {
                return {
                    statusCode: HttpStatus.OK,
                    message: "Registered SuccessFully",
                    data: {
                        authentication: {
                            Order_id: orderRes.Order_id,
                            OrderedPrice: orderRes.OrderedPrice,
                            
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
