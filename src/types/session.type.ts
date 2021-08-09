import {ClientType} from "./client.type";
import {TrainerType} from "./trainer.type";

export type SessionType = {
    id: number;
    starts_at: string;
    duration: string;
    type: Session;
    client?: ClientType;
    trainer?: TrainerType&{id:number};
    notes?: string | null;
}

export type Session = "Paid PT" | "Complimentary" | "Consulting" | "Coaching";

export type SessionStatus = 'upcoming' | 'past' | 'awaiting_scheduling'

export type SessionFilter = {
    id?: number,
    trainer_id?: number,
    client_id?: number,
    client_name?: string,
    type?: string,
    status?: SessionStatus,
    date?: string,
}

export type SessionEdit = {
    id: number,
    date: string,
    time: string,
    duration: string,
    notes: string,
}
