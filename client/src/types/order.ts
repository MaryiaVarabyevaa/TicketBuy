export enum IOrderActionTypes {
    ADD_SEATS='ADD_SEATS',
    ADD_SESSION_ID='ADD_SESSION_ID',
    RESTORE_FROM_STORAGE='RESTORE_FROM_STORAGE',
    CLEAR_ORDER='CLEAR_ORDER',
    CLEAR_CONTINUE_OR_PAYMENT_VALUES='CLEAR_CONTINUE_OR_PAYMENT_VALUES',
    ADD_ORDER='ADD_ORDER',
    OPEN_PAYMENT='OPEN_PAYMENT',
    IS_SUCCEED_PAYMENT='IS_SUCCEED_PAYMENT',
    UPDATE_ORDERS_INFO='UPDATE_ORDERS_INFO',
}

export interface IOrderState {
    seats: ISeat[];
    sessionId: number | null;
    continue?: boolean;
    payment?: boolean;
    orders: any[];
    isSucceedPayment: boolean;
}

export interface IOrderAction {
    type: string;
    payload?: any;
}

export interface ISeat {
    seat: number;
    row: number;
    price?: number;
    currency?: string;
}

// export interface IOrder extends IOrderState{
//     userId: number;
//     sum: number;
//     status: string;
// }

export interface IOrder {
    userId: number;
    sessionId: number;
    status: OrderStatus;
    price: string;
    currency: string;
    seats: ISeat
}

export enum OrderStatus {
    paid = 'paid',
    refused = 'refused'
}

