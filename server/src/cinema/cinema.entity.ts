import { Table, Column, Model, DataType } from 'sequelize-typescript';

// todo: закончить объект для создания
interface CinemaCreationAttrs {
    email: string;
    password: string;
    name: string;
    surname: string;
}

@Table({
    tableName: 'cinema',
    timestamps: true,
    // // schema: dbConfiguration.dbSchema,
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