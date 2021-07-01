import React from 'react';
import {useAuth} from "../hooks/auth.hook";
import {Redirect} from "react-router";
import {Routes} from "../enums/routes.enum";

export const onlyActive = (Component: React.ComponentType<any>) => (props: any) => {
    const {is_active} = useAuth();

    if(!is_active)
        return <Redirect to={Routes.REGISTER_CONFIRMATION}/>;
    return <Component {...props}/>
};
