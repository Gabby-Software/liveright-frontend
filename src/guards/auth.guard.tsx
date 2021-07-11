import React from 'react';
import {Redirect} from "react-router-dom";
import {Routes} from "../enums/routes.enum";
import cookieManager from "../managers/cookie.manager";
import {useAuth} from "../hooks/auth.hook";
import {identity} from "../pipes/identity.pipe";

export const onlyAuth = (Component: React.ComponentType<any>) => (props: any) => {
    const token = cookieManager.get('access_token');
    if(!token ) {
        document.location.href = identity(Routes.LOGIN);
        return null;
    }
    return <Component {...props}/>
};
