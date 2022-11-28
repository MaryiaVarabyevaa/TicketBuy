import {IsEmail, IsNotEmpty, IsNumber, IsString, MinLength} from 'class-validator';

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
    readonly firstName: string;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsString({
        message: 'Last name must be a string'
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