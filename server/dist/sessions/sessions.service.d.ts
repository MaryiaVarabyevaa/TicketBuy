import { Session } from "./sessions.entity";
import { CreateSessionDto } from "./dto/create-session.dto";
export declare class SessionsService {
    private sessionRepository;
    constructor(sessionRepository: typeof Session);
    addSession(dto: CreateSessionDto): Promise<Session>;
    getAllSessions(): Promise<Session[]>;
}
