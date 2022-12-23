export enum IOrderActionTypes {
    ADD_ORDER='ADD_ORDER',
    RESTORE_FROM_STORAGE='RESTORE_FROM_STORAGE',
    CLEAR_ORDER='CLEAR_ORDER'
}

export interface IOrderState {
    seats: ISeat[];
    sessionId: number | null;
}

export interface IOrderAction {
    type: string;
    payload?: any;
}

export interface ISeat {
    seat: number;
    row: number;
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