import {$host} from "./service";

interface IRegistration {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
}

export const registration = async ({firstName, lastName, email, password}: IRegistration) => {
    const response = await $host.post('/users', {firstName, lastName, email, password});
    return response;
}