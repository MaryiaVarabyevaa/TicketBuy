import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Order} from "./orders.entity";
import {CreateOrderDto} from "./dto/create-order.dto";

@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order) private orderRepository: typeof Order) {}

    async addOrder(orderDto: CreateOrderDto) {
        const order = await this.orderRepository.create(orderDto);
        return order;
    }

    async getOrdersByUserId(userId: number) {
        const orders = await  this.orderRepository.findAll({
            where: {
                userId,
                status: 'paid'
            }
        });

        return orders;
    }
}
