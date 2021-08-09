import React, {ReactElement, useRef, memo} from 'react';
import {UserOutlined} from '@ant-design/icons';
import {Avatar} from "antd";
import moment from "moment";

import {SessionType} from "../../../../types/session.type";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {useAuth} from "../../../../hooks/auth.hook";
import userTypes from "../../../../enums/user-types.enum";
import {StyledSessionCard, SessionCardWrapper, SwipeComponentWrapper} from './session-mobile-card.styles';
import {useClients} from "../../../../hooks/clients.hook";
import SessionUserAvatar from "../session-user-avatar/session-user-avatar.component";

interface Props {
    session: SessionType;
    renderSwipeComponent?: (session: SessionType) => ReactElement;
    renderOptions?: (session: SessionType) => ReactElement;
}

const SessionCard: React.FC<Props> = (props) => {
    const {t} = useTranslation()
    const {session, renderOptions, renderSwipeComponent} = props;
    const {client, trainer, type, starts_at, duration} = session;
    const clients = useClients();
    const isTrainer = useAuth().type === userTypes.TRAINER;
    const day = moment(starts_at).format("DD");
    const month = moment(starts_at).format("MMMM");
    let person;
    if (isTrainer) {
        person = clients.data.data.find(it => it.id === client?.id) as {first_name: string;last_name:string;avatar?:{url?: string}}
    } else {
        person = trainer as {first_name: string;last_name:string;avatar?:{url?: string}}
    }

    if (!person) {
        return null;
    }

    return (
        <SessionCardWrapper>
            <StyledSessionCard>
                <span>{type}</span>
                <span className="session-card-with">{t("sessions:with").toLowerCase()}</span>
                <div className="session-card-name">
                    <SessionUserAvatar first_name={person.first_name} last_name={person.last_name} avatar={person.avatar} />
                </div>
                <div className="sessions-card-datetime">
                    <div>
                        <span>{day}</span>
                        <span>{month.toUpperCase()}</span>
                    </div>
                    <span>{duration}</span>
                </div>
                {renderOptions && renderOptions(session)}
            </StyledSessionCard>
            {renderSwipeComponent && (
                <SwipeComponentWrapper>
                    {renderSwipeComponent(session)}
                </SwipeComponentWrapper>
            )}
        </SessionCardWrapper>
    );
};

export default memo(SessionCard);
