export interface ISession{
    id: number;
    filmId: number;
    cinemaId: number;
    city: string;
    street: string;
    buildingNumber: number;
}

export interface INewSession extends ISession{
    isNew?: string;
}