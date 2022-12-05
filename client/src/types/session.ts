export interface ISession{
    id: number;
    filmId: number;
    cinemaId: number;
    price: string;
    date: string;
    time: string;
}

export interface INewSession extends ISession{
    isNew?: string;
}