import {IsArray, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsNumber( {}, {
        message: 'The order amount must be in numerical terms'
    })
    readonly sum: number;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsArray({
        message: 'Enter the correct value'
    })
    readonly seats: string;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsNumber( {}, {
        message: 'User ID must be a number'
    })
    readonly userId: number;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsNumber( {}, {
        message: 'Session ID must be a number'
    })
    readonly sessionId: number;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsString({
        message: 'Status must be a string'
    })
    readonly status: string;
}