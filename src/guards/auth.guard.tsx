import React from 'react';
import {Redirect} from "react-router-dom";
import {Routes} from "../enums/routes.enum";

export const onlyAuth = (Component: React.ComponentType<any>) => (props: any) => {
    const token = localStorage.getItem('uuid');
    if(!token) {
        return <Redirect to={Routes.LOGIN}/>
    }
    return <Component {...props}/>
};
