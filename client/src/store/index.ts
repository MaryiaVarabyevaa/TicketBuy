import {createStore} from "@reduxjs/toolkit";
import {composeWithDevTools} from 'redux-devtools-extension';
import {userReducer} from "./reducers/userReducer";

// localStorage.clear()
export const store = createStore(userReducer, composeWithDevTools())