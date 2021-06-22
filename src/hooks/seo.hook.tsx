import React, {useState, useEffect} from 'react';
import routes from '../config/routes.config';
import { useLocation } from 'react-router-dom'

export const useSeo = () => {
    const location = useLocation();
    useEffect(() => {
        const path = location.pathname.substring(1).replace(/:[^\/]+/g, "[^\/]+");
        console.log('pathname', path);
        const reg = new RegExp(path);
        const route = routes.find(r => reg.test(r.url));
        if(route) {
            document.title = route.title;
        }
    }, [location]);
};
