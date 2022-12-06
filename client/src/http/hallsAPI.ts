import {$host} from "./service";
import {IHalls} from "../types/halls";
import {GridRowId} from "@mui/x-data-grid";

export const getAllHalls = async () => {
    const { data } = await $host.get('halls');
    return data;
}

export const addHalls = async (halls: IHalls) => {
    const { data } = await $host.post('halls/create', halls);
    return data;
}

export const updateHallInfo = async (hall: IHalls) => {
    const { data } = await $host.post('halls/update', hall);
    return data;
}

export const deleteHall = async (id: GridRowId) => {
    const { data } = await $host.post('halls/delete', {id});
    return data;
}
