import {Body, Controller, Post, Request} from '@nestjs/common';
import {OrdersService} from "./orders.service";
import {CreateOrderDto} from "./dto/create-order.dto";

@Controller('orders')
export class OrdersController {

    constructor(private orderService: OrdersService) {}

    @Post('create')
    create(@Body() orderDto: CreateOrderDto) {
        return this.orderService.addOrder(orderDto);
    }

    @Post('')
    getOrdersById(@Request() req) {
        return this.orderService.getOrdersByUserId(req.body.userId);
    }
}
