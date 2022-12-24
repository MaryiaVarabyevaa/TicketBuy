import { Session } from "./sessions.entity";
import { CreateSessionDto } from "./dto/create-session.dto";
import { UpdateSessionDto } from "./dto/update-session.dto";
export declare class SessionsService {
    private sessionRepository;
    constructor(sessionRepository: typeof Session);
    addSession(dto: CreateSessionDto): Promise<Session>;
    getAllSessions(): Promise<Session[]>;
    getSessionsByDate(date: string): Promise<Session[]>;
    findSessionsByCinemaId(cinemaId: number[]): Promise<Session[]>;
    getSessionsByCinemaId(cinemaId: number): Promise<Session[]>;
    getSessionInfoById(id: number): Promise<Session>;
    findCinemaIdByFilmId(filmId: number): Promise<any[]>;
    updateSessionInfo(sessionDto: UpdateSessionDto): Promise<[affectedCount: number]>;
    deleteSession(id: number): Promise<void>;
    getSessionsByFilmId(filmId: number): Promise<Session[]>;
    getSeats(id: number): Promise<Session>;
}
