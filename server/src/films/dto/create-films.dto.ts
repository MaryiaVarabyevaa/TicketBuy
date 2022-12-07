import {IsNotEmpty, IsNumber, IsString, Matches} from "class-validator";


export class CreateFilmsDto {
    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsString({
        message: 'Title must be a string'
    })
    @Matches(/^[a-zA-Z0-9 :,.]+$/, {
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
        message: 'Url must be a string'
    })
    readonly url: string;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsString({
        message: 'Genre must be a string'
    })
    readonly genre: string;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsString({
        message: 'Genre must be a string'
    })
    readonly runtime: string;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsString({
        message: 'Genre must be a string'
    })
    readonly country: string;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsString({
        message: 'Genre must be a string'
    })
    readonly imdbRating: string;
    //
    // @IsNotEmpty({
    //     message: 'Required to fill in'
    // })
    // @IsString({
    //     message: 'Description must be a string'
    // })
    // @Matches(/^[a-zA-Z0-9]+$/, {
    //     message: 'Description can contain only latin alphabet and numbers'
    // })
    // readonly reviews: string;
}