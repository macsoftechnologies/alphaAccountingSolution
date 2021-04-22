import { Controller, Body, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Res, Delete} from '@nestjs/common';
import { DeleteProduct, productRegister, updateProduct } from './dto/Product.dto';
import { ProductService } from "../product/product/product.service";
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }
    @Post('/register')
    async create(@Body() req: productRegister) {
        try {
            const result = await this.productService.Create(req)
            console.log("result", result);
            
            return result
        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        }

    }

    @Put('/updateProduct')
    async update(@Body() req: updateProduct) {
        try {
            const result = await this.productService.updateProduct(req)
            return result
        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        }
    }

    @Delete('/delete')
    async deleteUser(@Body() req: DeleteProduct) { 
      try {
        let response = await this.productService.delete(req);
  
        return response
      } catch (error) {
        return {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
        };
      }
    } 
}
