export interface ICinema {
    id: number;
    name: string;
    hallsNumber: number;
    hallsType: string;
    number?: number;
}

export interface INewCinema extends ICinema{
    isNew?: string;
}

export interface IUpdateCinemaInfo {
    name: string;
    hallsNumber: number;
    hallsType: string;
}