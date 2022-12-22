import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Order} from "./orders.entity";
import {CreateOrderDto} from "./dto/create-order.dto";

@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order) private orderRepository: typeof Order) {}

    async addOrder(dto: CreateOrderDto) {
        const order = await this.orderRepository.create(dto);
        return order;
    }
}
