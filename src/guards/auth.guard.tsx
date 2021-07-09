import React from 'react';
import {Redirect} from "react-router-dom";
import {Routes} from "../enums/routes.enum";
import cookieManager from "../managers/cookie.manager";

export const onlyAuth = (Component: React.ComponentType<any>) => (props: any) => {
    const token = cookieManager.get('access_token');
    if(!token) {
        return <Redirect to={Routes.LOGIN}/>
    }
    return <Component {...props}/>
};
