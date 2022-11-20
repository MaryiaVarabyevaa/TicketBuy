import { Model } from 'sequelize-typescript';
import { CreateSessionDto } from "./dto/create-session.dto";
export declare class Session extends Model<Session, CreateSessionDto> {
    id: number;
    session_time: number;
}
