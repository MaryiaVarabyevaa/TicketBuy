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

export const getAllFilmsByCountryASC = async () => {
    const { data } = await $host.get('film/get_by_country_asc');
    return data;
}

export const getAllFilmsByCountryDESC = async () => {
    const { data } = await $host.get('film/get_by_country_desc');
    return data;
}

export const getAllFilmsByTitleASC = async () => {
    const { data } = await $host.get('film/get_by_title_asc');
    return data;
}

export const getAllFilmsByTitleDESC = async () => {
    const { data } = await $host.get('film/get_by_title_desc');
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