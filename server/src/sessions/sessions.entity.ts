import {Table, Column, Model, DataType, BelongsToMany} from 'sequelize-typescript';
import {CreateSessionDto} from "./dto/create-session.dto";

// todo: закончить объект для создания
interface sessionCreationAttrs {
    email: string;
    password: string;
    name: string;
    surname: string;
}

@Table({tableName: 'session'})
export class Session extends Model<Session, CreateSessionDto > {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    session_time: number;

}