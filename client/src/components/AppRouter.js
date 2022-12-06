import React from "react";
import {Navigate, Route, Routes} from 'react-router-dom';
import {ADMIN_PANEL_ROUTE, FILM_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE} from "../constants/routes";
import LoginPage from '../pages/loginPage/LoginPage';
import MainPage from "../pages/mainPage/MainPage";
import DashBoard from "../pages/adminPanel/Dashboard";
import {useSelector} from "react-redux";
import Profile from "../pages/profilePage/Profile";
import Film from "../pages/filmPage/Film";


export const AppRouter = () => {

    const isAuth = useSelector(state => state.user.isAuth);

    return <Routes>
        <Route path={ADMIN_PANEL_ROUTE} element={<DashBoard />}/>
        <Route path={MAIN_ROUTE} element={<MainPage />}/>
        <Route path={LOGIN_ROUTE} element={<LoginPage />}/>
        <Route path={PROFILE_ROUTE} element={<Profile />}/>
        <Route path={FILM_ROUTE} element={<Film />}/>

        <Route path="*" element={<Navigate to={MAIN_ROUTE} replace />} />
    </Routes>
};
