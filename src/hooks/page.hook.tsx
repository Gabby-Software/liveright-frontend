import React, {useState, useEffect, useMemo} from 'react';
import {useLocation} from "react-router";
import routes from "../config/routes.config";
export const usePage = () => {
    const location = useLocation();
    return useMemo(() => {
        const path = location.pathname.substring(1).replace(/:[^\/]+/g, "[^\/]+");
        const reg = new RegExp(path);
        return routes.find(r => reg.test(r.url));
    }, [location]);
};
