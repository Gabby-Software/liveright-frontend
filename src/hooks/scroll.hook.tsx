import React, {useState, useEffect} from 'react';
import {useEvent} from "./event.hook";
export const useScroll = () => {
    const [scrollY, setScrollY] = useState<number>(window.scrollY);
    useEvent('scroll', () => setScrollY(window.scrollY));
    return scrollY;
};
