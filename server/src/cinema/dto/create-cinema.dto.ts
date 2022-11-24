// объекты dto необходимы для обмена данными между подсистемами (клиент -сервре)
import {IsNotEmpty, IsString} from 'class-validator';

export class CreateCinemaDto {
    @IsNotEmpty({
        message: 'Required to fill in'
    })
    @IsString({
        message: 'Cinema name must be a string'
    })
    readonly name: string;
}