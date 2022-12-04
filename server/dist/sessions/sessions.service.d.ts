import { Session } from "./sessions.entity";
import { CreateSessionDto } from "./dto/create-session.dto";
import { UpdateSessionDto } from "./dto/update-session.dto";
export declare class SessionsService {
    private sessionRepository;
    constructor(sessionRepository: typeof Session);
    addSession(dto: CreateSessionDto): Promise<Session>;
    getAllSessions(): Promise<Session[]>;
    updateSessionInfo(sessionDto: UpdateSessionDto): Promise<[affectedCount: number]>;
    deleteSession(id: number): Promise<void>;
}
