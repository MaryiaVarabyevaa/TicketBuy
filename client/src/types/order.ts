export enum IOrderActionTypes {
    ADD_SEATS='ADD_SEATS',
    ADD_SESSION_ID='ADD_SESSION_ID',
    RESTORE_FROM_STORAGE='RESTORE_FROM_STORAGE',
    CLEAR_ORDER='CLEAR_ORDER',
    CLEAR_CONTINUE_OR_PAYMENT_VALUES='CLEAR_CONTINUE_OR_PAYMENT_VALUES'
}

export interface IOrderState {
    seats: ISeat[];
    sessionId: number | null;
    continue?: boolean;
    payment?: boolean;
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

