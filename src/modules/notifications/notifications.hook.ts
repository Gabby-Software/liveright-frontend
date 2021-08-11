import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import NotificationsManager from "./notifications.manager";

export const useNotifications = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        // NotificationsManager.subscribe();
        // todo: fetch notifications count
    }, []);
}
