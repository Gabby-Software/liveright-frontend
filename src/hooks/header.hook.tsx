import React, {useState, useEffect} from 'react';
import {usePage} from "./page.hook";
import {HeaderConfigType} from "../types/route.type";
import {ReactComponent as CalendarIcon} from '../assets/media/icons/calendar.svg';
import {ReactComponent as BellIcon} from '../assets/media/icons/bell.svg';
import headers, {DEFAULT_TITLE} from "../config/header.config";

const defaultHeader: HeaderConfigType = {
    title: DEFAULT_TITLE,
    items: headers.default
};
export const useHeader = () => {
    const {header} = usePage() || {};
    return {
        ...defaultHeader,
        ...header
    };
};
