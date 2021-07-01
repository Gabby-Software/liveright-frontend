import React from 'react';
import {useAuth} from "../hooks/auth.hook";
import {Redirect} from "react-router-dom";
import {Routes} from "../enums/routes.enum";
import cookieManager from "../managers/cookie.manager";

export const onlyGuest = (Component: React.ComponentType<any>) => (props: any) => {
    const auth = useAuth();
    const cookie = cookieManager.get('liveright_session');
    if(auth.uuid && auth.is_active)
        return <Redirect to={Routes.HOME}/>;
    return <Component {...props}/>;
};
