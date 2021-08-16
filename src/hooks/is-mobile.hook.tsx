import React, {useState, useEffect} from 'react';
import {useWindowSize} from "./window-size.hook";
import {screenSizes} from "../enums/screen-sizes.enum";
import {useEvent} from "./event.hook";
export const useIsMobile = () => {
    const {width} = useWindowSize();
    const [printMode, setPrintMode] = useState(false);
    useEvent('beforeprint', () => {setPrintMode(true)})
    useEvent('afterprint', () => setPrintMode(false))
    return !printMode && width <= screenSizes.TABLET;
};
