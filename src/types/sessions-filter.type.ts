import {Session} from "./session.type";

export type SessionFilterType = {
    status: string;
    timeline: string;
    session_type: string;
}

export interface FilterValues {
    dateType: string;
    type: 'All' | Session;
}
