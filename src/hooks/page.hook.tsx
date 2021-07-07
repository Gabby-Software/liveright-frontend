import React, {useState, useEffect, useMemo} from 'react';
import {useLocation} from "react-router";
import {routes, authRoutes} from "../config/routes.config";
const allRoutes = [...routes, ...authRoutes];
export const usePage = () => {
    const location = useLocation();
    return useMemo(() => {
        const path = location.pathname;
        return allRoutes.find(r => {
            return new RegExp(`^${r.url.replace(/:[^\/]+/g, "[^\/]+")}$`).test(path)
        });
    }, [location]);
};
