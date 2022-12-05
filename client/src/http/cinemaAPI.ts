import {$host} from "./service";
import {GridRowId} from "@mui/x-data-grid";
import {ICinema} from "../types/cinema";

export const getAllCinema = async () => {
    const { data } = await $host.get('cinema');
    return data;
}

export const deleteCinema = async (id: GridRowId) => {
    const { data } = await $host.post('cinema/delete', {id});
    return data;
}

export const updateCinemaInfo = async (cinema: ICinema) => {
    const { data } = await $host.post('cinema/update', cinema);
    return data;
}

export const addCinema = async (cinema: ICinema) => {
    const { data } = await $host.post('cinema/create', cinema);
    return data;
}

export const getLastCinemaId = async () => {
    const { data } = await $host.get('cinema/get_id');
    return data;
};