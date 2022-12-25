import {IBasketAction, IBasketActionTypes, IBasketState} from "../../types/basket";
import {IOrderAction, IOrderActionTypes} from "../../types/order";

const defaultState: IBasketState = {
    toggle: false
};

export const basketReducer = (state=defaultState, action: IBasketAction) => {
    switch (action.type) {
        case IBasketActionTypes.TOGGLE:
            localStorage.setItem('toggle', action.payload);
            return {
                ...state,
                toggle: action.payload
            }
        case IBasketActionTypes.RESTORE_FROM_STORAGE:
            const toggle = localStorage.getItem('toggle') === 'true'? true : false;
            return {
                ...state,
                toggle
            }
        default:
            return state;
    }
}


export const toggleBasketAction = (payload: any): IOrderAction => {
    return {
        type: IBasketActionTypes.TOGGLE,
        payload: payload
    }
}