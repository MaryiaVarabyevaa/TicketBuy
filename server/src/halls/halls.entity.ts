import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {Cinema} from "../cinema/cinema.entity";
import {Session} from "../sessions/sessions.entity";

interface HallsCreationAttrs {
    type: string;
    hallNumber: number;
    cinemaId: number;
}



@Table({
    tableName: 'halls',
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
                    hallId: id,
                }
            }).then(r => console.log(r));
            console.log('after destroy');
        },
    }
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
        type: DataType.INTEGER,
        allowNull: false,
    })
    hallNumber: number;

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


    @HasMany(() => Session, { onDelete: 'CASCADE', hooks: true })
    session: Session[]
}