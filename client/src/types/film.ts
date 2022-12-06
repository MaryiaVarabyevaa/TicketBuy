export interface IFilm {
    id?: number;
    title: string;
    description: string;
    url: string;
    rating?: number;
    reviews?: string;
}

export interface INewFilm extends IFilm{
    isNew?: string;
}

export interface IFilmState {
    currentFilm: IFilm[];
}
export interface IFilmAction {
    type: string;
    payload?: any;
}

export enum FilmActionTypes {
    ADD_CURRENT_FILM = 'ADD_CURRENT_FILM',
    DELETE_CURRENT_FILM = 'DELETE_CURRENT_FILM',
    RESTORE_FROM_STORAGE='RESTORE_FROM_STORAGE',
}