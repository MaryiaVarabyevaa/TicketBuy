// объекты dto необходимы для обмена данными между подсистемами (клиент -сервре)
import {IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator';

export class CreateUserDto {
    @IsString({
        message: 'First name must be a string'
    })
    readonly firstName: string;

    @IsString({
        message: 'Last name must be a string'
    })
    readonly lastName: string;

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
    @MinLength(6, {
        message: 'Password must contain at least 6 characters',
    })
    readonly password: string;
}