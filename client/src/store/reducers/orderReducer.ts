import {IOrderAction, IOrderActionTypes, IOrderState} from "../../types/order";

const defaultState: IOrderState = {
    sessionId: null,
    seats: [],
    continue: false,
    payment: false,
    orders: [],
    isSucceedPayment: false
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
            const allOrders: any[] = [];
            const allSeats: any = state.seats[0];
            allSeats.map((seat: any) => {
                const order = {
                    sessionId: state.sessionId,
                    seats: seat
                }
                allOrders.push(order);
            })

            if (state.orders.length === 0) {
                localStorage.setItem('orders', JSON.stringify([...allOrders]));
            } else {
                localStorage.setItem('orders', JSON.stringify([...state.orders, ...allOrders]));
            }
            localStorage.setItem('seats', JSON.stringify([]));
            localStorage.setItem('sessionId', 'null');

            return {
                ...state,
                orders: [...state.orders, ...allOrders],
                sessionId: null,
                seats: []
            };
        case IOrderActionTypes.RESTORE_FROM_STORAGE:
            const seats = JSON.parse(localStorage.getItem('seats') as string);
            const sessionId = localStorage.getItem('sessionId');
            const continueValue = localStorage.getItem('continue') === 'true' ? true : false;
            const payment = localStorage.getItem('payment') === 'true' ? true : false;
            const orders = JSON.parse(localStorage.getItem('orders') as string);
            const isSucceedPayment = localStorage.getItem('isSucceedPayment') === 'true' ? true : false;
            return {
                ...state,
                seats: seats? seats: [],
                sessionId: sessionId !== 'null'? sessionId : null,
                orders: orders? orders : [],
                continue: continueValue,
                payment,
                isSucceedPayment
            };
        case IOrderActionTypes.CLEAR_ORDER:
            localStorage.removeItem('seats');
            localStorage.removeItem('sessionId');
            localStorage.removeItem('orders');
            return {
                ...state,
                orders: [],
                seats: [],
                sessionId: null
            }
        case IOrderActionTypes.OPEN_PAYMENT:
            localStorage.setItem('payment', action.payload);
            return {
                ...state,
                payment: action.payload
            }
        case IOrderActionTypes.IS_SUCCEED_PAYMENT:
            localStorage.setItem('isSucceedPayment', action.payload);
            return {
                ...state,
                isSucceedPayment: action.payload,
            }
        case IOrderActionTypes.UPDATE_ORDERS_INFO:
            state.orders.splice(action.payload, 1)
            localStorage.setItem('orders', JSON.stringify([state.orders]));
            return {
                ...state,
                orders: state.orders
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

export const openPaymentAction = (payload: any): IOrderAction => {
    return {
        type: IOrderActionTypes.OPEN_PAYMENT,
        payload: payload
    }
}

export const getResultOfPayment = (payload: any): IOrderAction => {
    return {
        type: IOrderActionTypes.IS_SUCCEED_PAYMENT,
        payload: payload
    }
}

export const updateOrdersInfo = (payload: any): IOrderAction => {
    return {
        type: IOrderActionTypes.UPDATE_ORDERS_INFO,
        payload: payload
    }
}

// localStorage.clear()