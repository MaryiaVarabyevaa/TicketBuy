import {$host} from "./service";

export const getAllSessions = async () => {
    const { data } = await $host.get('sessions');
    return data;
}