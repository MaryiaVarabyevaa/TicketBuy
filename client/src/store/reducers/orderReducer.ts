import {IOrderAction, IOrderActionTypes, IOrderState} from "../../types/order";

const defaultState: IOrderState = {
    sessionId: null,
    seats: [],
    continue: false,
    payment: false,
    orders: [],
};

export const orderReducer = (state = defaultState, action: IOrderAction) => {
    switch (action.type) {
        case IOrderActionTypes.ADD_SEATS:
            if (state.seats.length === 0) {
                localStorage.setItem('seats', JSON.stringify([action.payload.seats]));
            } else {
                localStorage.setItem('seats', JSON.stringify([...state.seats, action.payload.seats]));
            }
            localStorage.setItem('continue', action.payload.continue);
            localStorage.setItem('payment', action.payload.payment);
            return {
                ...state,
                seats: [...state.seats, action.payload.seats],
                continue: action.payload.continue,
                payment: action.payload.payment
            };
        case IOrderActionTypes.ADD_SESSION_ID:
            localStorage.setItem('sessionId', action.payload);
            return {
                ...state,
                sessionId: action.payload
            }
        case IOrderActionTypes.CLEAR_CONTINUE_OR_PAYMENT_VALUES:
            localStorage.setItem('continue', action.payload.continue);
            localStorage.setItem('payment', action.payload.payment);
            return {
                ...state,
                continue: action.payload.continue,
                payment: action.payload.payment
            }
        case IOrderActionTypes.ADD_ORDER:
            const order = {
                sessionId: state.sessionId,
                seats: state.seats
            }
            if (state.orders.length === 0) {
                localStorage.setItem('orders', JSON.stringify([order]));
            } else {
                localStorage.setItem('orders', JSON.stringify([...state.orders, order]));
            }
            localStorage.setItem('seats', JSON.stringify([]));
            localStorage.setItem('sessionId', 'null');

            return {
                ...state,
                orders: [...state.orders, order],
                sessionId: null,
                seats: []
            };
        case IOrderActionTypes.RESTORE_FROM_STORAGE:
            const seats = JSON.parse(localStorage.getItem('seats') as string);
            const sessionId = localStorage.getItem('sessionId');
            const continueValue = localStorage.getItem('continue') === 'true' ? true : false;
            const payment = localStorage.getItem('payment') === 'true' ? true : false;
            const orders = JSON.parse(localStorage.getItem('orders') as string);
            return {
                ...state,
                seats: seats? seats: [],
                sessionId: sessionId !== 'null'? sessionId : null,
                orders: orders? orders : [],
                continue: continueValue,
                payment,
            };
        case IOrderActionTypes.CLEAR_ORDER:
            localStorage.removeItem('seats');
            localStorage.removeItem('sessionId');
            return {
                ...state,
                seats: [],
                sessionId: null
            }
        default:
            return state;
    }
}

export const addSeatsAction = (payload: any): IOrderAction => {
    return {
        type: IOrderActionTypes.ADD_SEATS,
        payload: payload
    }
}

export const addSessionAction = (payload: any): IOrderAction => {
    return {
        type: IOrderActionTypes.ADD_SESSION_ID,
        payload: payload
    }
}

export const clearContinueOrPaymentValues = (payload: any): IOrderAction => {
    return {
        type: IOrderActionTypes.CLEAR_CONTINUE_OR_PAYMENT_VALUES,
        payload: payload
    }
}

export const clearOrderAction = (): IOrderAction => {
    return {
        type: IOrderActionTypes.CLEAR_ORDER,
    }
}

export const addOrderAction = (): IOrderAction => {
    return {
        type: IOrderActionTypes.ADD_ORDER
    }
}

// localStorage.clear()