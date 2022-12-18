import {$host} from "./service";
import jwt_decode from 'jwt-decode';
import {IUpdateUserInfo, IUser} from "../types/user";


export const registration = async (user: IUser) => {
    const { data } = await $host.post('user/registration', user);
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

export const login = async (user: IUser) => {
    const { data } = await $host.post('user/login', {email: user.email, password: user.password});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

export const checkUser = async (email: string, password: string) => {
    const { data } = await $host.post('user/check', {email, password});
    return data;
}

export const getAllUsers = async () => {
    const { data } = await $host.get('user');
    return data;
}

export const blockUser = async (id: number) => {
    const { data } = await $host.post('user/block', {id});
    return data;
}

export const changeRole = async (id: number) => {
    const { data } = await $host.post('user/changeRole', {id});
    return data;
}

export const updateUserInfo = async (user: IUpdateUserInfo) => {
    const { data } = await $host.post('user/update', user);
    return data;
}

export const updatePassword = async (email: string, password: string) => {
    const { data } = await $host.post('user/update-password',{email, password});
    return data;
}

export const getUser = async (email: string) => {
    const { data } = await $host.post('user/getUser', {email});
    return data;
}

export const getUserById = async (id: number) => {
    const { data } = await $host.post('user/getUserById', {id});
    return data;
}
