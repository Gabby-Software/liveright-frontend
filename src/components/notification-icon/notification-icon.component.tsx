import React, {useState, useEffect} from 'react';
import Styles from './notification-icon.styles';
import {classes} from "../../pipes/classes.pipe";
import {ReactComponent as Icon} from "../../assets/media/icons/bell.svg";

const NotificationIcon = () => {
    const [notificationCount, setNotificationCount] = useState(0);
    useEffect(() => {
        setNotificationCount(12);
    }, []);
    return (<Styles
        className={classes(notificationCount&&'notification__active')}
        data-count={String(notificationCount)}
    >
        <Icon/>
    </Styles>)
};

export default NotificationIcon;
