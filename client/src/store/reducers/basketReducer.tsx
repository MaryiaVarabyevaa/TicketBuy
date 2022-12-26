import {IBasketAction, IBasketActionTypes, IBasketState} from "../../types/basket";
import {IOrderAction, IOrderActionTypes} from "../../types/order";

const defaultState: IBasketState = {
    toggle: false,
    payment: false,
};

export const basketReducer = (state=defaultState, action: IBasketAction) => {
    switch (action.type) {
        case IBasketActionTypes.TOGGLE:
            localStorage.setItem('toggle', action.payload);
            return {
                ...state,
                toggle: action.payload
            }
        case IBasketActionTypes.OPEN_PAYMENT:
            localStorage.setItem('payment', action.payload);
            return {
                ...state,
                payment: action.payload
            }
        case IBasketActionTypes.RESTORE_FROM_STORAGE:
            const toggle = localStorage.getItem('toggle') === 'true'? true : false;
            const payment = localStorage.getItem('payment') === 'true'? true : false;
            return {
                ...state,
                toggle,
                payment,
            }
        default:
            return state;
    }
}


export const toggleBasketAction = (payload: boolean): IOrderAction => {
    return {
        type: IBasketActionTypes.TOGGLE,
        payload: payload
    }
}

export const openPaymentAction = (payload: boolean): IOrderAction => {
    return {
        type: IBasketActionTypes.OPEN_PAYMENT,
        payload: payload
    }
}