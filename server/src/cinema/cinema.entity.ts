import {Table, Column, Model, DataType, HasMany} from 'sequelize-typescript';
import {Session} from "../sessions/sessions.entity";

// todo: закончить объект для создания
interface CinemaCreationAttrs {
    name: string;
    hallsNumber: number;
    hallsType: string;
    city: string;
    street: string;
    buildingNumber: number;
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
        type: DataType.STRING(50),
        allowNull: false
    })
    city: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    street: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    buildingNumber: number;

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

    @HasMany(() => Session)
    session: Session[]
}