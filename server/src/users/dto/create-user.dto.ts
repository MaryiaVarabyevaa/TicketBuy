// объекты dto необходимы для обмена данными между подсистемами (клиент -сервре)
import {IsEmail, IsNotEmpty, IsString, Matches, MinLength} from 'class-validator';

export class CreateUserDto {
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

    @IsString({
        message: 'Password must be a string'
    })
    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @Matches(/^[a-zA-Z0-9]+$/, {
        message: 'Password can contain latin alphabet and numbers'
    })
    @MinLength(6, {
        message: 'Password must contain at least 6 characters',
    })
    readonly password: string;
}