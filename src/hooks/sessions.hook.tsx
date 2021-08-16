import {useSelector} from "react-redux";
import {RootState} from "../store/reducers";
import {useEffect, useState} from "react";
import moment from "moment";
import api from "../managers/api.manager";
import {EP_GET_SESSIONS} from "../enums/api.enum";
import {SessionType} from "../types/session.type";
import {checkIfBusy} from "../pipes/sessions-busy.pipe";

export const useSessions = () => {
    return useSelector((state: RootState) => state.sessions);
};

export const useUpcomingSessions = () => {
    return useSelector((state: RootState) => state.sessions.data.upcoming);
};

export const usePastSessions = () => {
    return useSelector((state: RootState) => state.sessions.data.past);
};

export const useAwaitingSessions = () => {
    return useSelector((state: RootState) => state.sessions.data.awaiting_scheduling);
};

interface UseIsBusyOptions {
    date: string;
    time: string;
    duration: string;
    sessionId?: number;
    params?: string;
}

export const useIsBusy = (options: UseIsBusyOptions) => {
    const {date, time, sessionId, duration, params} = options;
    const [isBusy, setIsBusy] = useState(false);

    useEffect(() => {
        const getIsBusy = async () => {
            if (date && time) {
                const start_date = moment(`${date} ${time}`);
                const paramsString = `?filter[date]=${date}&filter[status]=upcoming&${params}`;

                try {
                    const {data} = await api.get(EP_GET_SESSIONS + paramsString) as {data: {data: SessionType[]}}

                    if (data.data) {
                        const filteredSessions = data.data.filter((it) => it.id !== sessionId)

                        setIsBusy(checkIfBusy({
                            sessions: filteredSessions,
                            currentStartDate: start_date,
                            duration
                        }))
                    }
                } catch (e) {
                    console.log(e)
                }
            }
        }

        getIsBusy()
    }, [date, time, duration])

    return isBusy;
}
