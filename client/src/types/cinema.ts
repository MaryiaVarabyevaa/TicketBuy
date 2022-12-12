export interface ICinema {
    id?: number;
    name: string;
    city: string;
    street: string;
    buildingNumber: number;
    number?: number;
    types?: string[];
    type?: string[];
}

export interface INewCinema extends ICinema{
    isNew?: string;
}
//
// export interface IUpdateCinemaInfo {
//     name: string;
//     city: string;
//     street: string;
//     buildingNumber: number;
// }