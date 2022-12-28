import {$host} from "./service";
import {IOrder} from "../types/order";

export const addOrder = async (order: IOrder) => {
    const { data } = await $host.post('orders/create', order);
    return data;
}

export const getOrderById = async (userId: number) => {
    const { data } = await $host.post('orders', {userId});
    return data;
}