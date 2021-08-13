import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import notificationsManager, {NotificationsManager} from "./notifications.manager";
import {useAuth} from "../../hooks/auth.hook";
import {RootState} from "../../store/reducers";
import {AccountObjType} from "../../types/account.type";
import {ACTION_GET_UNREAD_NOTIFICATIONS_COUNT_REQUEST, ACTION_NEW_NOTIFICATION} from "../../store/action-types";
import {NotificationsReducerType} from "../../store/reducers/notifications.reducer";
import {useLocation} from "react-router";
import {Routes} from "../../enums/routes.enum";

export const useNotificationsChannel = () => {
    const {uuid} = useAuth();
    const dispatch = useDispatch();
    const {pathname} = useLocation();
    useEffect(() => {
        if (!uuid) return;
        notificationsManager.unsubscribeFromNotifications();
        notificationsManager.init(uuid);
        const subscription = notificationsManager.subscribe(() => {
            if (pathname === Routes.NOTIFICATIONS) return;
            dispatch({type: ACTION_NEW_NOTIFICATION});
        })
        return () => notificationsManager.unsubscribe(subscription);
    }, [uuid]);
}

export const useNotifications = () => useSelector((state: RootState) => state.notifications) as NotificationsReducerType;

export const useUnreadNotifications = () => {
    const dispatch = useDispatch();
    const {unread} = useNotifications();
    const {uuid} = useAuth();
    useEffect(() => {
        dispatch({type: ACTION_GET_UNREAD_NOTIFICATIONS_COUNT_REQUEST});
    }, [uuid]);
    return unread;
}