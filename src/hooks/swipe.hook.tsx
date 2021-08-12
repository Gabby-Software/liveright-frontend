import React, {useState, useEffect, useMemo, useRef} from 'react';
import {useEvent} from "./event.hook";
import logger from "../managers/logger.manager";
export type SwipeType = {
    x: number;
    y: number;
}
export const useSwipe = (ref: React.RefObject<HTMLElement>, minSwipe:(e:SwipeType) => boolean, onSwipeEnd: (e:SwipeType) => void) => {
    const swiping = useRef<boolean>(false);
    const swipeStart = useRef<SwipeType>({x: 0, y: 0});
    const [startData, setStartData] = useState<SwipeType>({x:0,y:0});
    const [currentData, setCurrentData] = useState<SwipeType>({x:0,y:0});
    const getTouchPoints = (e: TouchEvent) => ({x:e.changedTouches[0].clientX, y:e.changedTouches[0].clientY});
    useEvent('touchstart', (e) => {
        if(ref.current?.contains(e.target as HTMLElement)) {
            swiping.current = true;
            setStartData(getTouchPoints(e as TouchEvent));
            setCurrentData(getTouchPoints(e as TouchEvent));
            swipeStart.current = getTouchPoints(e as TouchEvent);
        }
    });
    useEvent('touchend', (e) => {
        if(!swiping.current) return;
        swiping.current = false;
        const {x,y} = getTouchPoints(e as TouchEvent);
        const progress = {x: x - swipeStart.current.x, y: y - swipeStart.current.y};
        if(minSwipe(progress)) {
            onSwipeEnd({x: x - swipeStart.current.x, y: y - swipeStart.current.y});
            setTimeout(() =>{
                setStartData({x:0,y:0});
                setCurrentData({x:0,y:0});
            }, 400);
        } else {
            setStartData({x:0,y:0});
            setCurrentData({x:0,y:0});
        }
    });
    useEvent('touchmove', (e) => {
        if(swiping.current) {
            setCurrentData(getTouchPoints(e as TouchEvent));
        }
    });
    return {x: currentData.x-startData.x, y: currentData.y-startData.y};
};
