import React, {useState, useEffect} from 'react';
import Styles from './notification-icon.styles';
import {classes} from "../../pipes/classes.pipe";
import {ReactComponent as Icon} from "../../assets/media/icons/bell.svg";
import {useUnreadNotifications} from "../../modules/notifications/hooks/notifications.hook";
import logger from "../../managers/logger.manager";

const NotificationIcon = () => {
    const notificationCount = useUnreadNotifications();
    logger.info('NEW UNREAD NOTIFICATION');
    return (<Styles
        className={classes(notificationCount&&'notification__active')}
        data-count={String(notificationCount)}
    >
        <Icon/>
    </Styles>)
};

export default NotificationIcon;
