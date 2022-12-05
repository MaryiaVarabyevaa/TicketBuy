import {IsDateString, IsNotEmpty, IsNumber, Matches} from "class-validator";

export class UpdateSessionDto {

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsNumber( {}, {
        message: 'Id must be a number'
    })
    readonly id: number;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsDateString({}, {
        message: 'Required to be a date'
    })
    readonly date: string;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @Matches(/^[0-9:]+$/, {
        message: 'Time field can contain only numbers and colon'
    })
    readonly time: string;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    // @IsNumber( {}, {
    //     message: 'Id must be a number'
    // })
    readonly price: string;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsNumber( {}, {
        message: 'Id must be a number'
    })
    readonly  filmId: number;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsNumber( {}, {
        message: 'Id must be a number'
    })
    readonly  cinemaId: number;
}