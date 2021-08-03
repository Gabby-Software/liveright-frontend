import React, {useState, useEffect, useMemo} from 'react';
import {useLocation, useParams} from "react-router";
import {routes, authRoutes} from "../config/routes.config";
const allRoutes = [...routes, ...authRoutes];
export const usePage = () => {
    const location = useLocation();
    const {id} = useParams<{id: string}>();
    return useMemo(() => {
        const path = location.pathname;
        let route = allRoutes.find(r => {
            return new RegExp(`^${r.url.replace(/:[^\/]+/g, "[^\/]+")}$`).test(path)
        });
        return route;
    }, [location]);
};
