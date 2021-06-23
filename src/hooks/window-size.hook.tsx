import React, {useState, useEffect} from 'react';
import {useEvent} from "./event.hook";
import {SizeType} from "../types/size.type";
export const useWindowSize = () => {
    const currentSize = () => ({width: window.innerWidth, height: window.innerHeight});
    const [windowSize, setWindowSize] = useState<SizeType>(currentSize());
    useEvent('resize', () => {setWindowSize(currentSize());});
    return windowSize;
};
export const withWindowSize = (Component: React.ComponentType<{windowSize: SizeType}>) => (props:React.ComponentProps<any>) => {
    const windowSize = useWindowSize();
    return <Component windowSize={windowSize} {...props}/>
};
