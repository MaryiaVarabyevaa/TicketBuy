import {IsNotEmpty, IsNumber, IsString, Matches} from "class-validator";

export class UpdateFilmDto {

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
    @IsString({
        message: 'Title must be a string'
    })
    @Matches(/^[a-zA-Z0-9 :,]+$/, {
        message: 'Title can contain only latin alphabet and numbers'
    })
    readonly title: string;


    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsString({
        message: 'Description must be a string'
    })
    readonly description: string;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsString({
        message: 'Description must be a string'
    })
    readonly url: string;
}