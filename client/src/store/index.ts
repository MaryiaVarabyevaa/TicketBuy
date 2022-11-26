import {createStore} from "@reduxjs/toolkit";
import {composeWithDevTools} from 'redux-devtools-extension';
import {userReducer} from "./reducers/userReducer";

export const store = createStore(userReducer, composeWithDevTools())