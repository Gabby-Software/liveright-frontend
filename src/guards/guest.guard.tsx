import React from 'react';
import {useAuth} from "../hooks/auth.hook";
import {Redirect} from "react-router-dom";
import {Routes} from "../enums/routes.enum";

export const onlyGuest = (Component: React.ComponentType<any>) => (props: any) => {
    const auth = useAuth();
    if(auth.uuid && auth.is_active)
        return <Redirect to={Routes.HOME}/>;
    return <Component {...props}/>;
};
