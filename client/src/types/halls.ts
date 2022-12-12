export interface IHalls {
    id?: number;
    cinemaId: number;
    hallNumber?: number;
    type: string[];
    // type?: string;
}

export interface IUpdateHallInfo {
    cinemaId: number;
    hallNumber?: number;
    type: string;
    // type?: string;
}
