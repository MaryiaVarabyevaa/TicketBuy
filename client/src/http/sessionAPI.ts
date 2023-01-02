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
    currency: string;
}

interface ISession {
    filmId: number;
    cinemaId: number;
    hallId: number;
    date: string;
    time: string;
    price: string;
    currency: string;
}

export const addSession = async (session: ISession) => {
    const { data } = await $host.post('sessions/create', session);
    return data;
}

export const findSessionsByCinemaId = async (cinemaId: number[]) => {
    const { data } = await $host.post('sessions/get_by_cinemaId', {cinemaId});
    return data;
}

export const getSessionsByCinemaId = async (cinemaId: number) => {
    const { data } = await $host.post('sessions/get-by-cinemaId', {cinemaId});
    return data;
}

export const getSessionsByHallId = async (hallId: number) => {
    const { data } = await $host.post('sessions/get-by-hallId', {hallId});
    return data;
}

export const getSessionsByFilmId = async (filmId: number) => {
    const { data } = await $host.get('sessions/' + filmId);
    return data;
}

export const getSessionsByDate = async (date: string) => {
    const { data } = await $host.post('sessions/get_by_date', {date});
    return data;
}

export const getCinemaIdByFilmId = async (filmId: number) => {
    const { data } = await $host.post('sessions/get_cinemaId', {filmId});
    return data;
}

export const getAllSessions = async () => {
    const { data } = await $host.get('sessions');
    return data;
}

export const getCurrentFilmsFromSessions = async () => {
    const { data } = await $host.get('sessions/current');
    return data;
}

export const getSeats = async (id: number) => {
    const { data } = await $host.post('sessions/get-seats', {id});
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

export const getSessionInfoById = async (id: number) => {
    const { data } = await $host.post('sessions/get-info', {id});
    return data;
}

export const takeSeat = async (id: number, place: {seat: number, row: number}) => {
    const { data } = await $host.post('sessions/take-seats', {id, place});
    return data;
}