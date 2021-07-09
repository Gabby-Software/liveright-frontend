import React from 'react';
import {Redirect} from "react-router-dom";
import {Routes} from "../enums/routes.enum";
import cookieManager from "../managers/cookie.manager";
import {useAuth} from "../hooks/auth.hook";

export const onlyAuth = (Component: React.ComponentType<any>) => (props: any) => {
    const token = cookieManager.get('access_token');
    if(!token ) {
        document.location.href = document.location.protocol + '//identity.' + document.location.host;
    }
    return <Component {...props}/>
};
