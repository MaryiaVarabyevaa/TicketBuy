import {$host} from "./service";
import jwt_decode from 'jwt-decode';

interface IRegistration {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
}

export const registration = async (user: IRegistration) => {
    const { data } = await $host.post('user/registration', user);
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

export const login = async (user: IRegistration) => {
    const { email, password } = user;
    const { data } = await $host.post('user/login', {email, password});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}