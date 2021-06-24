import React, {useState, useEffect} from 'react';
import {usePage} from "./page.hook";
import {HeaderConfigType} from "../types/route.type";
import {ReactComponent as CalendarIcon} from '../assets/media/icons/calendar.svg';
import {ReactComponent as BellIcon} from '../assets/media/icons/bell.svg';

const defaultHeader: HeaderConfigType = {
    title: 'LiveRight',
    back: '',
    items: [
        {url: '/calendar', Icon: CalendarIcon},
        {url: '/notifications', Icon: BellIcon}
    ]
};
export const useHeader = () => {
    const {header} = usePage() || {};
    return {
        ...defaultHeader,
        ...header
    };
};
