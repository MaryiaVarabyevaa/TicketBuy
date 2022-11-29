import {IsNotEmpty, IsNumber, IsString, Matches} from 'class-validator';

export class CreateCinemaDto {
    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsString({
        message: 'Cinema name must be a string'
    })
    @Matches(/^[a-zA-Z]+$/, {
        message: 'Cinema name can contain only latin alphabet'
    })
    readonly name: string;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsNumber({}, {
        message: 'Number of halls must be a number'
    })
    readonly hallsNumber: number;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsString({
        message: 'Type of halls must be a string'
    })
    @Matches(/^[a-zA-Z]+$/, {
        message: 'Type of halls can contain only latin alphabet'
    })
    readonly hallsType: string;
}