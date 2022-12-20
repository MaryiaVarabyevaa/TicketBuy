import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.entity";
import {Session} from "../sessions/sessions.entity";

interface OrderCreationAttrs {
    title: string;
    description: string;
    url: string;
}

@Table({
    tableName: 'orders',
    timestamps: true,
    paranoid: true,
})
export class Order extends Model<Order, OrderCreationAttrs> {
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
    status: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    sum: number;

    @Column({
        type: DataType.JSONB,
        allowNull: false
    })
    seats: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
    })
    userId: number;

    @BelongsTo(() => User)
    user: User

    @ForeignKey(() => Session)
    @Column({
        type: DataType.INTEGER,
    })
    sessionId: number;

    @BelongsTo(() => Session)
    session: Session
}