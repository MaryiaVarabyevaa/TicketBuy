export enum IOrderActionTypes {
    ADD_ORDER='ADD_ORDER',
    RESTORE_FROM_STORAGE='RESTORE_FROM_STORAGE',
}

export interface IOrderState {
    order: any[]

}

export interface IOrderAction {
    type: string;
    payload?: any;
}

export interface ISeat {
    seat: number;
    row: number;
}