import React, {useState, useEffect} from 'react';
import {useWindowSize} from "./window-size.hook";
import {screenSizes} from "../enums/screen-sizes.enum";
export const useIsMobile = () => {
    const {width} = useWindowSize();
    return width <= screenSizes.TABLET;
};
