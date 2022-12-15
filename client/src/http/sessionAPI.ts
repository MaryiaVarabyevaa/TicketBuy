import {$host} from "./service";
import {GridRowId} from "@mui/x-data-grid";

interface ISessionUpdate {
    id: number;
    filmId: number;
    cinemaId: number;
    hallId: number;
    date: string;
    time: string;
    price: string;
}

interface ISession {
    filmId: number;
    cinemaId: number;
    hallId: number;
    date: string;
    time: string;
    price: string;
}

export const addSession = async (session: ISession) => {
    const { data } = await $host.post('sessions/create', session);
    return data;
}

export const findSessionsByCinemaId = async (cinemaId: number[]) => {
    const { data } = await $host.post('sessions/get_by_cinemaId', {cinemaId});
    return data;
}

export const getSessionsByDate = async (date: string) => {
    const { data } = await $host.post('sessions/get_by_date', {date});
    return data;
}

export const getAllSessions = async () => {
    const { data } = await $host.get('sessions');
    return data;
}

export const updateSessionInfo = async (session: ISessionUpdate) => {
    const { data } = await $host.post('sessions/update', session);
    return data;
}

export const deleteSession = async (id: GridRowId) => {
    const { data } = await $host.post('sessions/delete', {id});
    return data;
}
