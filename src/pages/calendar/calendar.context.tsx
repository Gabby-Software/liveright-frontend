import React, {createContext, useState} from 'react';
import {calendarView} from "../../enums/calendar-views.enum";

export type CalendarContextType = {
    currentDate: Date;
    setCurrentDate: (d: Date) => void;
    view: string,
    setView: (view:string) => void;
};
export const CalendarContext = createContext<CalendarContextType>({
    currentDate: new Date(),
    setCurrentDate: ()=> {},
    view: calendarView.MONTH,
    setView: () => {}
});

export default function CalendarProvider({children}: {children: React.ReactNode}) {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [view, setView] = useState<string>(calendarView.MONTH);

    return (
        <CalendarContext.Provider value={{currentDate, setCurrentDate, view, setView}}>
            {children}
        </CalendarContext.Provider>
    );
};
