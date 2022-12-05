import {IsNotEmpty, IsNumber, IsString, Matches} from 'class-validator';

export class CreateCinemaDto {
    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsString({
        message: 'Cinema name must be a string'
    })
    @Matches(/^[a-zA-Z ]+$/, {
        message: 'Cinema name can contain only latin alphabet'
    })
    readonly name: string;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsString({
        message: 'City field must be a string'
    })
    @Matches(/^[a-zA-Z ]+$/, {
        message: 'City field can contain only latin alphabet'
    })
    readonly city: string;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsString({
        message: 'Street field must be a string'
    })
    @Matches(/^[a-zA-Z .,]+$/, {
        message: 'Street field can contain only latin alphabet'
    })
    readonly street: string;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsNumber({}, {
        message: 'Number of building must be a string'
    })
    readonly buildingNumber: number;
}