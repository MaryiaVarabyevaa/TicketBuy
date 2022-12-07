import {Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {Cinema} from "../cinema/cinema.entity";
import {Film} from "../films/films.entity";
import {User} from "../users/users.entity";
// todo: закончить объект для создания
interface CommentCreationAttrs {
    text: string;
    filmId: number;
    userId: number;
}

@Table({
    tableName: 'comments',
    timestamps: true,
    paranoid: true,
})
export class Comment extends Model<Comment, CommentCreationAttrs> {
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
    text: string;

    @ForeignKey(() => Film)
    @Column({
        type: DataType.INTEGER,
    })
    filmId: number;

    @BelongsTo(() => Film)
    filmTitle: Film

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
    })
    userId: number;

    @BelongsTo(() => User)
    user: User
}