import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import {MAIN_ROUTE, LOGIN_ROUTE, ADMIN_PANEL_ROUTE} from "../constants/routes";
import LoginPage from '../pages/loginPage/LoginPage';
import MainPage from "../pages/mainPage/MainPage";
import AdminPanel from "../pages/adminPanel/AdminPanel";


export const AppRouter = () => {
    const isAuth = false;
    return <Routes>
        <Route path={MAIN_ROUTE} element={<MainPage />}/>
        <Route path={LOGIN_ROUTE} element={<LoginPage />}/>
        <Route path={ADMIN_PANEL_ROUTE} element={<AdminPanel />}/>
        <Route path="*" element={<Navigate to={MAIN_ROUTE} replace />} />
    </Routes>
};