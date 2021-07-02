import {useContext, useMemo} from "react";
import {CalendarContext} from "./calendar.context";
import moment from "moment";

export const useCalendar = (type: 'week'|'month') => {
    const {currentDate} = useContext(CalendarContext);
    const startDisplay = useMemo(() => {
        return moment(currentDate).startOf(type).startOf('week').toDate();
    }, [currentDate]);
    const today = useMemo(() => moment(new Date()), []);
    return {currentDate, startDisplay, today};
};