import React, {useState, useEffect} from 'react';
import {usePage} from "./page.hook";
import {HeaderConfigType} from "../types/route.type";
import {ReactComponent as CalendarIcon} from '../assets/media/icons/calendar.svg';
import {ReactComponent as BellIcon} from '../assets/media/icons/bell.svg';
import headers, {DEFAULT_TITLE} from "../config/header.config";
import logger from "../managers/logger.manager";

const defaultHeader: HeaderConfigType = {
    title: DEFAULT_TITLE,
    items: headers.default
};
export const manualHeader: any = {
    title: '',
    setTitle: (title:string) => {}
};
export const useHeader = () => {
    const {header} = usePage() || {};
    const [manual, setManual] = useState('');
    manualHeader.title = manual;
    manualHeader.setTitle = setManual;
    const res = {
        ...defaultHeader,
        ...header
    };
    if(manual) {
        res.title = manual
    }
    return res;
};
