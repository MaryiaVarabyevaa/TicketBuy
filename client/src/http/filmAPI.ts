import {$host} from "./service";
import {GridRowId} from "@mui/x-data-grid";
import {ICinema, IUpdateCinemaInfo} from "../types/cinema";
import {IFilm, IUpdateFilmInfo} from "../types/film";

export const getAllFilms = async () => {
    const { data } = await $host.get('film');
    return data;
}

export const deleteFilm = async (id: GridRowId) => {
    const { data } = await $host.post('film/delete', {id});
    return data;
}

export const addFilm = async (film: IUpdateFilmInfo) => {
    const { data } = await $host.post('film/create', film);
    return data;
}

export const updateFilmInfo = async (film: IFilm) => {
    const { data } = await $host.post('film/update', film);
    return data;
}