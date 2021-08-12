import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import notificationsManager from "./notifications.manager";
import {useAuth} from "../../hooks/auth.hook";
import {RootState} from "../../store/reducers";
import {AccountObjType} from "../../types/account.type";
import {ACTION_GET_UNREAD_NOTIFICATIONS_COUNT_REQUEST, ACTION_NEW_NOTIFICATION} from "../../store/action-types";
import {NotificationsReducerType} from "../../store/reducers/notifications.reducer";

export const useNotificationsChannel = () => {
    const {id} = useSelector((state:RootState) => state.auth) as AccountObjType;
    const dispatch = useDispatch();
    useEffect(() => {
        if(!id) return;
        notificationsManager.init(id);
        const subscription = notificationsManager.subscribe(() => {
            dispatch({type: ACTION_NEW_NOTIFICATION});
        })
        return () => notificationsManager.unsubscribe(subscription);
    }, [id]);
}

export const useNotifications = () => useSelector((state: RootState) => state.notifications) as NotificationsReducerType;

export const useUnreadNotifications = () => {
    const dispatch = useDispatch();
    const {unread} = useNotifications();
    useEffect(() => {
        dispatch({type: ACTION_GET_UNREAD_NOTIFICATIONS_COUNT_REQUEST});
    }, []);
    return unread;
}