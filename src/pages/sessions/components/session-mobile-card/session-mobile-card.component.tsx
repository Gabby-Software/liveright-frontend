import React, {ReactElement, memo, ReactNode} from 'react';
import moment from "moment";

import {SessionType} from "../../../../types/session.type";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {useAuth} from "../../../../hooks/auth.hook";
import userTypes from "../../../../enums/user-types.enum";
import SessionUserAvatar from "../session-user-avatar/session-user-avatar.component";
import {Wrapper} from './session-mobile-card.styles';

interface Props {
    session: SessionType;
    SwipeContent?: ReactNode;
    renderOptions?: (session: SessionType) => ReactElement;
}

const SessionCard: React.FC<Props> = (props) => {
    const {t} = useTranslation()
    const {session, renderOptions, SwipeContent} = props;
    const {client, trainer, type, starts_at} = session;
    const isTrainerType = useAuth().type === userTypes.TRAINER;
    const person = isTrainerType ? client : trainer;
    const day = moment(starts_at).format("DD");
    const month = moment(starts_at).format("MMMM");
    const time = moment.utc(starts_at).format("HH:mm");

    return (
        <Wrapper SwipeContent={SwipeContent}>
            <span>{type}</span>
            <span className="session-card-with">{t("sessions:with").toLowerCase()}</span>
            <div className="session-card-name">
                <SessionUserAvatar first_name={person?.user.first_name} last_name={person?.user.last_name} />
            </div>
            <div className="sessions-card-datetime">
                <div>
                    <span>{day}</span>
                    <span>{month.toUpperCase()}</span>
                </div>
                <span>{time}</span>
            </div>
            {renderOptions && renderOptions(session)}
        </Wrapper>
    );
};

export default memo(SessionCard);
