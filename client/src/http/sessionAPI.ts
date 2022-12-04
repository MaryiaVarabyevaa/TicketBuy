import {$host} from "./service";
import {IFilm, IUpdateFilmInfo} from "../types/film";
import {GridRowId} from "@mui/x-data-grid";

interface ISessionUpdate {
    id: number;
    filmId: number;
    cinemaId: number;
    date: string;
    time: string;
    price: number;
}

interface ISession {
    filmId: number;
    cinemaId: number;
    date: string;
    time: string;
    price: number;
}

export const addSession = async (session: ISession) => {
    const { data } = await $host.post('sessions/create', session);
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
