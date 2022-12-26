export enum IOrderActionTypes {
    ADD_SEATS='ADD_SEATS',
    ADD_SESSION_ID='ADD_SESSION_ID',
    RESTORE_FROM_STORAGE='RESTORE_FROM_STORAGE',
    CLEAR_ORDER='CLEAR_ORDER',
    CLEAR_CONTINUE_OR_PAYMENT_VALUES='CLEAR_CONTINUE_OR_PAYMENT_VALUES',
    ADD_ORDER='ADD_ORDER',
}

export interface IOrderState {
    seats: ISeat[];
    sessionId: number | null;
    continue?: boolean;
    payment?: boolean;
    orders: any[];
}

export interface IOrderAction {
    type: string;
    payload?: any;
}

export interface ISeat {
    seat: number;
    row: number;
    price?: number
}

export interface IOrder extends IOrderState{
    userId: number;
    sum: number;
    status: string;
}

export enum OrderStatus {
    paid = 'paid',
    refused = 'refused'
}

