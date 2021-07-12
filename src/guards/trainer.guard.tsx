import React, {ComponentProps} from "react";
import {useAuth} from "../hooks/auth.hook";
import userTypes from "../enums/user-types.enum";
import PageNotFound from "../pages/page-not-found/page-not-found.component";

export const onlyTrainer = (Component: React.ComponentType<any>) => (props: ComponentProps<any>) => {
    const {type} = useAuth();
    if(type !== userTypes.TRAINER)
        return <PageNotFound/>;
    return <Component {...props}/>;
};
