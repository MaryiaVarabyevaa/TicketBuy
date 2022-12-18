import { SessionsService } from "./sessions.service";
import { CreateSessionDto } from "./dto/create-session.dto";
import { UpdateSessionDto } from "./dto/update-session.dto";
export declare class SessionsController {
    private sessionService;
    constructor(sessionService: SessionsService);
    create(sessionDto: CreateSessionDto): Promise<import("./sessions.entity").Session>;
    updateSessionInfo(sessionDto: UpdateSessionDto): Promise<[affectedCount: number]>;
    deleteSession(req: any): Promise<void>;
    getAll(): Promise<import("./sessions.entity").Session[]>;
    findSessionsByCinemaId(req: any): Promise<import("./sessions.entity").Session[]>;
    findCinemaIdByFilmId(req: any): Promise<any[]>;
    getSessionsByCinemaId(req: any): Promise<unknown[]>;
    getSessionsByDate(req: any): Promise<import("./sessions.entity").Session[]>;
}
