import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import NotificationsManager from "./notifications.manager";
import {useAuth} from "../../hooks/auth.hook";
import {RootState} from "../../store/reducers";
import {AccountObjType} from "../../types/account.type";

export const useNotifications = () => {
    const dispatch = useDispatch();
    const {id} = useSelector((state:RootState) => state.auth) as AccountObjType;
    useEffect(() => {
        if(!id) return;
        NotificationsManager.subscribe(id);
        // todo: fetch notifications count
    }, [id]);
}

