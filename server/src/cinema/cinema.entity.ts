import { Table, Column, Model, DataType } from 'sequelize-typescript';

// todo: закончить объект для создания
interface CinemaCreationAttrs {
    email: string;
    password: string;
    name: string;
    surname: string;
}

@Table({tableName: 'cinema'})
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
}