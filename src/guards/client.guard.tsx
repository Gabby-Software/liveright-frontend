import React, {ComponentProps} from "react";
import {useAuth} from "../hooks/auth.hook";
import userTypes from "../enums/user-types.enum";
import {Redirect} from "react-router";
import {Routes} from "../enums/routes.enum";

export const onlyClient = (Component: React.ComponentType<any>) => (props: ComponentProps<any>) => {
    const {type} = useAuth();
    if(type !== userTypes.CLIENT)
        return <Redirect to={Routes.HOME}/>;
    return <Component {...props}/>;
};
