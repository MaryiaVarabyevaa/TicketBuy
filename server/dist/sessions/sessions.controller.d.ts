import { SessionsService } from "./sessions.service";
import { CreateSessionDto } from "./dto/create-session.dto";
import { UpdateSessionDto } from "./dto/update-session.dto";
export declare class SessionsController {
    private sessionService;
    constructor(sessionService: SessionsService);
    create(sessionDto: CreateSessionDto): Promise<import("./sessions.entity").Session>;
    updateSessionInfo(sessionDto: UpdateSessionDto): Promise<[affectedCount: number]>;
    deleteCinema(req: any): Promise<void>;
    getAll(): Promise<import("./sessions.entity").Session[]>;
    findSessionsByCinemaId(req: any): Promise<import("./sessions.entity").Session[]>;
    getSessionsByDate(req: any): Promise<import("./sessions.entity").Session[]>;
}
