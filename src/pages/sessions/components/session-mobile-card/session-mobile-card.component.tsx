import React, {ReactElement, useRef, memo} from 'react';
import {UserOutlined} from '@ant-design/icons';
import {Avatar} from "antd";
import moment from "moment";

import {SessionType} from "../../../../types/session.type";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {useAuth} from "../../../../hooks/auth.hook";
import userTypes from "../../../../enums/user-types.enum";
import {StyledSessionCard, SessionCardWrapper, SwipeComponentWrapper} from './session-mobile-card.styles';

interface Props {
    session: SessionType;
    renderSwipeComponent?: (session: SessionType) => ReactElement;
    renderOptions?: (session: SessionType) => ReactElement;
}

const SessionCard: React.FC<Props> = (props) => {
    const {t} = useTranslation()
    const {session, renderOptions, renderSwipeComponent} = props;
    const {client, trainer, type, starts_at, duration} = session;
    const isTrainer = useAuth().type === userTypes.TRAINER;
    const person = isTrainer ? client : trainer;
    const day = moment(starts_at).format("DD");
    const month = moment(starts_at).format("MMMM");

    if (!person) {
        return null;
    }

    return (
        <SessionCardWrapper>
            <StyledSessionCard>
                <span>{type}</span>
                <span className="session-card-with">{t("sessions:with").toLowerCase()}</span>
                <div className="session-card-name">
                    <Avatar size="small" icon={<UserOutlined />} />
                    {person.first_name} {person.last_name}
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
