import React from "react";
import {Navigate, Route, Routes} from 'react-router-dom';
import {BASKET_ROUTE, DASHBOARD_ROUTE, FILM_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE} from "../constants/routes";
import LoginPage from '../pages/loginPage/LoginPage';
import MainPage from "../pages/mainPage/MainPage";
import Film from "../pages/filmPage/Film";
import Profile from "../pages/profilePage/Profile";
import Basket from "../pages/paymentPage/Basket";
import DashBoard from "../pages/dashboard/Dashboard";


export const AppRouter = () => {
    return <Routes>
        <Route // path={MAIN_ROUTE}
            index
            element={<MainPage />}/>
        <Route path={LOGIN_ROUTE} element={<LoginPage />}/>
        <Route path={BASKET_ROUTE} element={<Basket />} />
        <Route path={DASHBOARD_ROUTE} element={<DashBoard/>}/>
        <Route path={PROFILE_ROUTE} element={<Profile />}/>
        <Route path={FILM_ROUTE} element={<Film />}/>
        <Route path="*" element={<Navigate to={MAIN_ROUTE} replace />} />
    </Routes>
};
