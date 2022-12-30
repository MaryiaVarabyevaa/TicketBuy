import {IsArray, IsEnum, IsJSON, IsNotEmpty, IsNumber, IsObject, IsString} from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsString()
    readonly price: string;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsString({
        message: 'Currency must be a string'
    })
    readonly currency: string;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsObject({
        message: 'Enter the correct value',
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
    @IsEnum({
        paid: 'paid',
        refused: 'refused'
    })
    readonly status: string;
}