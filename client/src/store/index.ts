import {combineReducers, createStore} from "@reduxjs/toolkit";
import {composeWithDevTools} from 'redux-devtools-extension';
import {userReducer} from "./reducers/userReducer";
import {filmReducer} from "./reducers/filmReducer";

const rooReducer = combineReducers({
    user: userReducer,
    film: filmReducer
})

export const store = createStore(rooReducer, composeWithDevTools())