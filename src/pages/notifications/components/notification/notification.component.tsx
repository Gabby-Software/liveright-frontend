import React, {useState, useEffect} from 'react';
import Styles from './notification.styles';
import {NotificationType} from "../../../../types/notification.type";
import {NotificationIcon, notificationIconMap, notificationSeen} from "./notification.icon";
import moment from 'moment';
import {useIsMobile} from "../../../../hooks/is-mobile.hook";
import {ReactComponent as GoToIcon} from "../../../../assets/media/icons/ext-link.svg";
import {Link} from "react-router-dom";
import FormButton from "../../../../components/forms/form-button/form-button.component";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";

const Notification = ({content, datetime, seen, type, url}: NotificationType) => {
    const isMobile = useIsMobile();
    const {t} = useTranslation();
    const Icon = notificationIconMap[type];
    const EyeIcon = notificationSeen(seen);
    return (
        <Styles>
            <Icon className={'notification__icon'}/>
            <div className={'notification__data'}>
                <div className={'notification__content'}>{content}</div>
                <div className={'notification__datetime'}>{moment(datetime).format('DD.MM.YYYY • hh:mm')}</div>
            </div>
            {
                isMobile ? (
                    <Link to={url} className={'notification__link'}><GoToIcon
                        className={'notification__link__icon'}/></Link>
                ) : (
                    <>
                        <Link to={url} className={'notification__action'}>
                            <FormButton type={'ghost'}>
                                {t('notifications:go-to', {type: t(`notifications:types.${type}`)})}
                            </FormButton>
                        </Link>
                        <EyeIcon className={'notification__eye'}/>
                    </>
                )
            }
        </Styles>
    )
};

export default Notification;
