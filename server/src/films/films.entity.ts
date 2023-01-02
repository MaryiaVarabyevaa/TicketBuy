import {Column, DataType, HasMany, Model, Table} from 'sequelize-typescript';
import {Session} from "../sessions/sessions.entity";
import {Comment} from "../comments/comments.entity";

// todo: закончить объект для создания
interface FilmCreationAttrs {
    title: string;
    description: string;
    url: string;
}

@Table({
    tableName: 'films',
    timestamps: true,
    paranoid: true,

    hooks: {
        beforeBulkDestroy(options): any {
            options.individualHooks = true;
            return options;
        },
        afterDestroy: function(instance, options) {
            const id = instance.dataValues.id;
            Session.destroy({
                where: {
                    filmId: id,
                }
            }).then(r => console.log(r));
            console.log('after destroy');
        },
    }
})
export class Film extends Model<Film, FilmCreationAttrs> {
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
    title: string;

    @Column({
        type: DataType.STRING(1000),
        allowNull: false
    })
    description: string;

    @Column({
        type: DataType.STRING(5000),
        allowNull: false,
    })
    url: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    genre: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    runtime: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    country: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    imdbRating: string;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0
    })
    rating: number;


    @HasMany(() => Session, { onDelete: 'CASCADE', hooks: true })
    session: Session[]

    @HasMany(() => Comment)
    comments: Comment[]
}