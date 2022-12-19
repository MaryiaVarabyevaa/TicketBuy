import {Table, Column, Model, DataType, BelongsToMany, BelongsTo, ForeignKey} from 'sequelize-typescript';
import {CreateSessionDto} from "./dto/create-session.dto";
import {Cinema} from "../cinema/cinema.entity";
import {Film} from "../films/films.entity";
import {Halls} from "../halls/halls.entity";

// todo: закончить объект для создания
interface sessionCreationAttrs {
    email: string;
    password: string;
    name: string;
    surname: string;
}

@Table({
    tableName: 'session',
    timestamps: true,
    paranoid: true,
})
export class Session extends Model<Session, CreateSessionDto > {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false
    })
    date: string;

    @Column({
        type: DataType.TIME,
        allowNull: false
    })
    time: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    price: string;

    @ForeignKey(() => Film)
    @Column({
        type: DataType.INTEGER,
    })
    filmId: number;

    @BelongsTo(() => Film)
    filmTitle: Film

    @ForeignKey(() => Cinema)
    @Column({
        type: DataType.INTEGER,
    })
    cinemaId: number;

    @BelongsTo(() => Cinema)
    cinemaName: Cinema


    @ForeignKey(() => Halls)
    @Column({
        type: DataType.INTEGER,
        onDelete: 'CASCADE',
    })
    hallId: number;

    @BelongsTo(() => Halls, {onDelete: 'CASCADE'})
    hallNumber: Cinema;

    @Column({
        type: DataType.JSONB,
        defaultValue: {
            1: {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false},
            2: {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false},
            3: {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false},
            4: {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false},
            5: {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false},
            6: {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false},
            7: {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false},
            8: {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false},
            9: {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false},
            10: {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false},
            11: {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false},
            12: {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false},
        }
    })
    seats: string;
}