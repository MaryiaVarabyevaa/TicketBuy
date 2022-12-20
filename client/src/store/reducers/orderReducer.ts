import {IOrderAction, IOrderActionTypes, IOrderState} from "../../types/order";
import {UserActionTypes} from "../../types/user";

const defaultState: IOrderState = {
    order: [],
};

export const orderReducer = (state = defaultState, action: IOrderAction) => {
    switch (action.type) {
        case IOrderActionTypes.ADD_ORDER:
            if (state.order.length === 0) {
                localStorage.setItem('order', JSON.stringify([action.payload]));
            } else {
                localStorage.setItem('order', JSON.stringify([...state.order, action.payload]));
            }
            return {...state, order: [...state.order, action.payload]};
        case IOrderActionTypes.RESTORE_FROM_STORAGE:
            const order = JSON.parse(localStorage.getItem('order') as string);
            return {...state, order: order? order: []};
        default:
            return state;
    }
}

export const addOrderAction = (payload: any): IOrderAction => {
    return {
        type: IOrderActionTypes.ADD_ORDER,
        payload: payload
    }
}
