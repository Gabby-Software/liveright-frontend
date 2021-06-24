import React, {useState, useEffect, useMemo} from 'react';
import {useLocation} from "react-router";
import {routes, authRoutes} from "../config/routes.config";
const allRoutes = [...routes, ...authRoutes];
export const usePage = () => {
    const location = useLocation();
    return useMemo(() => {
        const path = location.pathname.substring(1).replace(/:[^\/]+/g, "[^\/]+");
        const reg = new RegExp(path);
        return allRoutes.find(r => reg.test(r.url));
    }, [location]);
};
