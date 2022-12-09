import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsString({
        message: 'Comment text must be a string'
    })
    readonly text: string;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsNumber( {}, {
        message: 'Film id must be a number'
    })
    readonly filmId: number;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsNumber( {}, {
        message: 'User id must be a number'
    })
    readonly userId: number;
}