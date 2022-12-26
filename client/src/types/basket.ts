export enum IBasketActionTypes {
    TOGGLE="TOGGLE",
    RESTORE_FROM_STORAGE='RESTORE_FROM_STORAGE',
    OPEN_PAYMENT="OPEN_PAYMENT"
}

export interface IBasketState {
    toggle: boolean;
    payment: boolean;
}

export interface IBasketAction {
    type: string;
    payload?: any;
}