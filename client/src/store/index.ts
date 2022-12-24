import {combineReducers, createStore} from "@reduxjs/toolkit";
import {composeWithDevTools} from 'redux-devtools-extension';
import {userReducer} from "./reducers/userReducer";
import {orderReducer} from "./reducers/orderReducer";
import {basketReducer} from "./reducers/basketReducer";

const rootReducer = combineReducers({
    user: userReducer,
    order: orderReducer,
    basket: basketReducer
})

export const store = createStore(rootReducer, composeWithDevTools())