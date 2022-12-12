import {IsArray, IsNotEmpty, IsNumber, IsString, Matches} from "class-validator";

export class CreateHallsDto {
    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsArray({
        message: 'Types must be an array'
    })
    readonly type: string[];

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsNumber( {}, {
        message: 'Cinema id must be a number'
    })
    readonly cinemaId: number;
}