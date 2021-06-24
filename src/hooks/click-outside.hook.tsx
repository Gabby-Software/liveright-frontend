import React, {useState, useEffect, ReactElement} from 'react';
import {useEvent} from "./event.hook";
export const useClickOutside = (ref: React.RefObject<HTMLElement>) => {
    const [open, setOpen] = useState<boolean>(false);
    useEvent('click', (e) => {
        if(ref.current?.contains(e.target as HTMLElement)) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    });
    return open;
};
