import {$host} from "./service";
import {GridRowId} from "@mui/x-data-grid";
import {IReview} from "../types/review";

export const getComments = async (id: number) => {
    const { data } = await $host.get('comments/' + id);
    return data;
}

export const deleteComment = async (id: GridRowId) => {
    const { data } = await $host.post('comments/delete', {id});
    return data;
}

export const addComment = async (comment: IReview) => {
    const { data } = await $host.post('comments/create', comment);
    return data;
}

export const checkComment = async (userId: number, filmId: number) => {
    const { data } = await $host.post('comments/check', {userId, filmId});
    return data;
}

export const updateComment = async (filmId: number, userId: number, text: string) => {
    const { data } = await $host.post('comments/update', {userId, filmId, text});
    return data;
}