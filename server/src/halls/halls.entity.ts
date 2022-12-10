import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Cinema} from "../cinema/cinema.entity";

interface HallsCreationAttrs {
    type: string;
    cinemaId: number;
}


@Table({
    tableName: 'halls',
    timestamps: true,
    paranoid: true,
})
export class Halls extends Model<Halls, HallsCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    type: string;

    @ForeignKey(() => Cinema)
    @Column({
        type: DataType.INTEGER,
    })
    cinemaId: number;

    @BelongsTo(() => Cinema)
    cinemaName: Cinema;
}