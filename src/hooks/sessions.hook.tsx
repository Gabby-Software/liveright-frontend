import {useSelector} from "react-redux";
import {RootState} from "../store/reducers";

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
