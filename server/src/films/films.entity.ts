import {Table, Column, Model, DataType, HasMany} from 'sequelize-typescript';
import {Session} from "../sessions/sessions.entity";

// todo: закончить объект для создания
interface FilmCreationAttrs {
    title: string;
    description: string;
    url: string;
}

@Table({
    tableName: 'films',
    timestamps: true,
    paranoid: true,
})
export class Film extends Model<Film, FilmCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    title: string;

    @Column({
        type: DataType.STRING(1000),
        allowNull: false
    })
    description: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    url: string;

    @Column({
        type: DataType.INTEGER,
    })
    rating: number;

    @Column({
        type: DataType.STRING,
    })
    reviews: string;


    @HasMany(() => Session)
    session: Session[]
}