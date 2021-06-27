import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import {useEvent} from "./event.hook";

export const useHoverOutside: (ref: React.RefObject<HTMLElement>) => [boolean, Dispatch<SetStateAction<boolean>>] =
    (ref: React.RefObject<HTMLElement>) => {
        const [open, setOpen] = useState<boolean>(false);
        useEvent('mousemove', (e) => {
            if (ref.current?.contains(e.target as HTMLElement)) {
                setOpen(true);
            } else {
                setOpen(false);
            }
        }, document.body);
        return [open, setOpen];
    };
