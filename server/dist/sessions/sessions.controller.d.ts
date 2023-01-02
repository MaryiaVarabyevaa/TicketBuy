import { SessionsService } from "./sessions.service";
import { CreateSessionDto } from "./dto/create-session.dto";
import { UpdateSessionDto } from "./dto/update-session.dto";
export declare class SessionsController {
    private sessionService;
    constructor(sessionService: SessionsService);
    create(sessionDto: CreateSessionDto): Promise<import("./sessions.entity").Session>;
    updateSessionInfo(sessionDto: UpdateSessionDto): Promise<[affectedCount: number]>;
    deleteSession(req: any): Promise<void>;
    getSeats(req: any): Promise<import("./sessions.entity").Session>;
    getAll(): Promise<import("./sessions.entity").Session[]>;
    getCurrentFilmsFromSessions(): Promise<any[]>;
    findSessionsByCinemaId(req: any): Promise<import("./sessions.entity").Session[]>;
    findCinemaIdByFilmId(req: any): Promise<any[]>;
    getSessionsByCinemaId(req: any): Promise<import("./sessions.entity").Session[]>;
    getSessionsByDate(req: any): Promise<import("./sessions.entity").Session[]>;
    takeSeats(req: any): Promise<string>;
    getSessionsByFilmId(id: number): Promise<import("./sessions.entity").Session[]>;
}
