import {$host} from "./service";
import {GridRowId} from "@mui/x-data-grid";
import {IFilm} from "../types/film";

export const getAllFilms = async () => {
    const { data } = await $host.get('film');
    return data;
}

export const getAllFilmsByRatingDESC = async () => {
    const { data } = await $host.get('film/get_by_rating_desc');
    return data;
}

export const getAllFilmsByRatingASC = async () => {
    const { data } = await $host.get('film/get_by_rating_asc');
    return data;
}

export const getFilmsByGenre = async (genre: string[]) => {
    const { data } = await $host.post('film/filter_by_genre', {genre});
    return data;
}

export const getFilmsById = async (id: number[]) => {
    const { data } = await $host.post('film/filter_by_id', {id});
    return data;
}

export const deleteFilm = async (id: GridRowId) => {
    const { data } = await $host.post('film/delete', {id});
    return data;
}

export const addFilm = async (film: IFilm) => {
    const { data } = await $host.post('film/create', film);
    return data;
}

export const updateFilmInfo = async (film: IFilm) => {
    const { data } = await $host.post('film/update', film);
    return data;
}

export const getFilm = async (id: number) => {
    const { data } = await $host.get('film/' + id);
    return data;
}

export const getSortedFilms = async (genre: string[], id: number[], value: string) => {
    const { data } = await $host.post('film/sort', {genre, id, value});
    return data;
}