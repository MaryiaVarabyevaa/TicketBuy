import {IsEmail, IsNotEmpty, IsNumber, IsString, Matches} from 'class-validator';

export class UpdateUserDto {
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
        message: 'First name must be a string'
    })
    @Matches(/^[a-zA-Z]+$/, {
        message: 'First name can contain only latin alphabet'
    })
    readonly firstName: string;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsString({
        message: 'Last name must be a string'
    })
    @Matches(/^[a-zA-Z]+$/, {
        message: 'Last name can contain only latin alphabet'
    })
    readonly lastName: string;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsString({
        message: 'Email must be a string'
    })
    @IsEmail({}, {
        message: 'Incorrect email'
    })
    readonly email: string;
}