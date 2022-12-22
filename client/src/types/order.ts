export enum IOrderActionTypes {
    ADD_ORDER='ADD_ORDER',
    RESTORE_FROM_STORAGE='RESTORE_FROM_STORAGE',
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