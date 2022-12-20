import {FilmActionTypes, IFilm, IFilmAction, IFilmState} from "../../types/film";

const defaultState: IFilmState = {
    currentFilm: [],
};

export const filmReducer = (state = defaultState, action: IFilmAction): IFilmState => {
    switch (action.type) {
        case FilmActionTypes.ADD_CURRENT_FILM:
            localStorage.setItem('currentFilm', JSON.stringify([action.payload]));
            return {...state, currentFilm: action.payload};
        case FilmActionTypes.DELETE_CURRENT_FILM:
            localStorage.setItem('currentFilm', JSON.stringify([]));
            return {...state, currentFilm: []};
        default:
            return state;
    }
}

export const addFilmAction = (payload: IFilm): IFilmAction => {
    return {
        type: FilmActionTypes.ADD_CURRENT_FILM,
        payload: payload
    }
}

export const deleteFromStorageAction = () => {
    return {
        type: FilmActionTypes.DELETE_CURRENT_FILM,
    }
}
