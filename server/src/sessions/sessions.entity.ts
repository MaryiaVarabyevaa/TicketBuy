import {Table, Column, Model, DataType, BelongsToMany, BelongsTo, ForeignKey, HasMany} from 'sequelize-typescript';
import {CreateSessionDto} from "./dto/create-session.dto";
import {Cinema} from "../cinema/cinema.entity";
import {Film} from "../films/films.entity";
import {Halls} from "../halls/halls.entity";
import {Order} from "../orders/orders.entity";

// todo: закончить объект для создания
interface sessionCreationAttrs {
    date: string;
    time: string;
    price: string;
    currency: string;
    filmId: number;
    hallId: number;
    cinemaId: number;
}

@Table({
    tableName: 'session',
    timestamps: true,
    paranoid: true,
})
export class Session extends Model<Session, sessionCreationAttrs > {
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

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    currency: string;

    @Column({
        type: DataType.JSONB,
        defaultValue: [
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        ]
    })
    seats: string;

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

    @HasMany(() => Order)
    orders: Order[]
}

