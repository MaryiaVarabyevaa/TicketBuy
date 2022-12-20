import {combineReducers, createStore} from "@reduxjs/toolkit";
import {composeWithDevTools} from 'redux-devtools-extension';
import {userReducer} from "./reducers/userReducer";
import {orderReducer} from "./reducers/orderReducer";

const rootReducer = combineReducers({
    user: userReducer,
    order: orderReducer
})

export const store = createStore(rootReducer, composeWithDevTools())