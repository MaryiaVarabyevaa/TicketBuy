import {IsNotEmpty, IsNumber, IsString, Matches} from "class-validator";

export class UpdateHallDto {

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsNumber( {}, {
        message: 'Cinema must be a number'
    })
    readonly cinemaId: number;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsNumber( {}, {
        message: 'Number field must be a number'
    })
    readonly hallNumber: number;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsString({
        message: 'Description must be a string'
    })
    readonly type: string;
}