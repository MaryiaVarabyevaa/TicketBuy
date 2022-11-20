import { Table, Column, Model, DataType } from 'sequelize-typescript';

// todo: закончить объект для создания
interface FilmCreationAttrs {
    email: string;
    password: string;
    name: string;
    surname: string;
}

@Table({tableName: 'films'})
export class Film extends Model<Film, FilmCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING(50),
        unique: true,
        allowNull: false
    })
    title: string;

    @Column({
        type: DataType.STRING(50),
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
        allowNull: false,
    })
    rating: number;

    @Column({
        type: DataType.STRING,
        defaultValue: ''
    })
    reviews: string;
}