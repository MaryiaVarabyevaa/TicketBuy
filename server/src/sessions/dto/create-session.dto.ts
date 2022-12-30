import {IsDateString, IsNotEmpty, IsNumber, Matches, MaxLength} from "class-validator";
import {Column, DataType} from "sequelize-typescript";

export class CreateSessionDto {
    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsDateString({}, {
        message: 'Required to be a date'
    })
    readonly date: string;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    // @Matches(/^\d\d:\d\d:\d\d+$/g, {
    //     message: 'Enter the correct value',
    // })
    readonly time: string;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    // @Matches(/^\d\d.\d\d+$/g, {
    //     message: 'Enter the correct value'
    // })
    readonly price: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    currency: string;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsNumber( {}, {
        message: 'Id must be a number'
    })
    readonly filmId: number;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsNumber( {}, {
        message: 'Id must be a number'
    })
    readonly cinemaId: number;

    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsNumber( {}, {
        message: 'Id must be a number'
    })
    readonly hallId: number;
}