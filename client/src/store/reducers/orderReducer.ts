import {IOrderAction, IOrderActionTypes, IOrderState} from "../../types/order";
import {UserActionTypes} from "../../types/user";

const defaultState: IOrderState = {
    sessionId: null,
    seats: []
};

export const orderReducer = (state = defaultState, action: IOrderAction) => {
    switch (action.type) {
        case IOrderActionTypes.ADD_ORDER:
            if (state.seats.length === 0) {
                localStorage.setItem('seats', JSON.stringify([action.payload.seats]));
            } else {
                localStorage.setItem('seats', JSON.stringify([...state.seats, action.payload.seats]));
            }
            localStorage.setItem('sessionId', action.payload.sessionId);
            return {
                ...state,
                seats: [...state.seats, action.payload.seats],
                sessionId: action.payload.sessionId
            };
        case IOrderActionTypes.RESTORE_FROM_STORAGE:
            const seats = JSON.parse(localStorage.getItem('seats') as string);
            const sessionId = JSON.parse(localStorage.getItem('sessionId') as string);
            return {
                ...state,
                seats: seats? seats: [],
                sessionId: sessionId? sessionId : null,
            };
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