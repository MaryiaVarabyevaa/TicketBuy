export enum IBasketActionTypes {
   TOGGLE="TOGGLE",
   RESTORE_FROM_STORAGE='RESTORE_FROM_STORAGE',
}

export interface IBasketState {
    toggle: boolean;
}

export interface IBasketAction {
    type: string;
    payload?: any;
}