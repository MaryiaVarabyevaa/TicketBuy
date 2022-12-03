import { SessionsService } from "./sessions.service";
import { CreateSessionDto } from "./dto/create-session.dto";
export declare class SessionsController {
    private sessionService;
    constructor(sessionService: SessionsService);
    create(sessionDto: CreateSessionDto): Promise<import("./sessions.entity").Session>;
    getAll(): Promise<import("./sessions.entity").Session[]>;
}
