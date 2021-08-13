import React, {useState, useEffect} from 'react';
import Styles from './notification.styles';
import {NotificationType} from "../../../../types/notifications.type";
import {NotificationIcon, notificationIconMap, notificationSeen} from "./notification.icon";
import moment from 'moment';
import {useIsMobile} from "../../../../hooks/is-mobile.hook";
import {ReactComponent as GoToIcon} from "../../../../assets/media/icons/ext-link.svg";
import {Link} from "react-router-dom";
import FormButton from "../../../../components/forms/form-button/form-button.component";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import PopOnScroll from "../../../../components/pop-on-scroll/pop-on-scroll.component";
import {notificationIcon} from "../../../../modules/notifications/enums/notification-icon.enum";
import {notificationUrl} from "../../../../modules/notifications/enums/notification-url.enum";

const Notification = ({created_at, read_at, data, type}: NotificationType) => {
    const isMobile = useIsMobile();
    const {t} = useTranslation();
    const {Icon, color} = notificationIcon(type);
    const EyeIcon = notificationSeen(!!read_at);
    const {url, slug} = notificationUrl(type, data);
    return (
        <PopOnScroll offset={70}>
            <Styles>
                <Icon className={`notification__icon notification__icon__${color}`}/>
                <div className={'notification__data'}>
                    <div className={'notification__content'}>{data.message}</div>
                    <div className={'notification__datetime'}>{moment(created_at).format('DD.MM.YYYY • hh:mm')}</div>
                </div>
                {
                    !url ? null :
                    isMobile ? (
                        <Link to={url} className={'notification__link'}><GoToIcon
                            className={'notification__link__icon'}/></Link>
                    ) : (
                        <>
                            <Link to={url} className={'notification__action'}>
                                <FormButton type={'ghost'}>
                                    {t('notifications:go-to', {type: slug})}
                                </FormButton>
                            </Link>
                            <EyeIcon className={'notification__eye'}/>
                        </>
                    )
                }
            </Styles>
        </PopOnScroll>
    )
};

export default Notification;
