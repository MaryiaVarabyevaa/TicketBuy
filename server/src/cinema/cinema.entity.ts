import { Table, Column, Model, DataType } from 'sequelize-typescript';

// todo: закончить объект для создания
interface CinemaCreationAttrs {
    name: string;
    hallsNumber: number;
    hallsType: string;
}

@Table({
    tableName: 'cinema',
    timestamps: true,
    paranoid: true,
})
export class Cinema extends Model<Cinema, CinemaCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    hallsNumber: number;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    hallsType: string;
}