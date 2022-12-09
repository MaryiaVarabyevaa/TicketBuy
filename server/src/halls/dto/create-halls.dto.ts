import {IsNotEmpty, IsNumber, IsString, Matches} from "class-validator";

export class CreateHallsDto {
    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsNumber( {}, {
        message: 'Number field must be a number'
    })
    readonly number: number;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsString({
        message: 'Type must be a string'
    })
    readonly type: string;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsNumber( {}, {
        message: 'Cinema id must be a number'
    })
    readonly cinemaId: number;
}