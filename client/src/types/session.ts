export interface ISession{
    id?: number;
    filmId: number;
    cinemaId: number;
    price: string;
    currency: string;
    date: string;
    time: string;
    filmTitle?: string;
    cinemaName?: string;
    hallId?: number[];
}

export interface INewSession extends ISession{
    isNew?: string;
}