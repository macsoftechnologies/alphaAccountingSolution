import { HttpStatus, Injectable } from '@nestjs/common';
import { product } from '../schema/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { productRegister, updateProduct } from '../dto/Product.dto';

@Injectable()
export class ProductService {
    
    constructor(@InjectModel(product.name) private productModel: Model<product>) { }


    async Create(req: productRegister) {
        try {
            const registerRes = await this.productModel.create(req)
            if (registerRes) {
                return {
                    statusCode: HttpStatus.OK,
                    message: "Registered SuccessFully",
                    data: {
                        authentication: {
                            Name_of_the_product: registerRes.Name_of_the_product,
                            Description: registerRes.Description,
                            Price: registerRes.Price
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
   
    async updateProduct(body: updateProduct) {
        try {
            // console.log(body, "body............")
            const updateRes = await this.productModel.updateOne({ Product_id: body.Product_id }, { $set: { Name_of_the_product: body.Name_of_the_product, Description: body.Description, Price: body.Price, Discount: body.Discount, Documents_required: body.Documents_required } })
            // console.log(updateRes, "update,,res")
            if (updateRes.nModified == 1) {
                return {
                    StatusCode: HttpStatus.OK,
                    Message: "Product updated successFully"
                }
            }
            return {
                StatusCode: HttpStatus.BAD_REQUEST,
                Message: "Product updation Failed"
            }
        } catch (error) {
            return {
                StatusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                Message: error.message
            }
        }
    }

}
