import { Table, Column, Model, DataType } from 'sequelize-typescript';

// todo: закончить объект для создания
interface UserCreationAttrs {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
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
    firstName: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    lastName: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        unique: true
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string;

    @Column({
        type: DataType.STRING(50),
        defaultValue: 'user'
    })
     role: string;
}