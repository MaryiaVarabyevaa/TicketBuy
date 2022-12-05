import {Table, Column, Model, DataType, BelongsToMany, BelongsTo, ForeignKey} from 'sequelize-typescript';
import {CreateSessionDto} from "./dto/create-session.dto";
import {Cinema} from "../cinema/cinema.entity";
import {Film} from "../films/films.entity";

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
}