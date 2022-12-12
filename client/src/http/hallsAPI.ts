import {$host} from "./service";
import {IHalls, IUpdateHallInfo} from "../types/halls";
import {GridRowId} from "@mui/x-data-grid";

export const getAllHalls = async () => {
    const { data } = await $host.get('halls');
    return data;
}

export const addHalls = async (halls: IHalls) => {
    const { data } = await $host.post('halls/create', halls);
    return data;
}

export const updateHallInfo = async (hall: IUpdateHallInfo) => {
    const { data } = await $host.post('halls/update', hall);
    return data;
}

export const deleteHall = async (cinemaId: GridRowId, hallNumber: number) => {
    const { data } = await $host.post('halls/delete_hall', {cinemaId, hallNumber});
    return data;
}


export const deleteAllHalls = async (cinemaId: GridRowId) => {
    const { data } = await $host.post('halls/delete', {cinemaId});
    return data;
}