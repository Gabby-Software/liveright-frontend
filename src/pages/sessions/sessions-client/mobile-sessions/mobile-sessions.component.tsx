import React, {useState} from 'react';
import Styles from './mobile-sessions.styles';
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {SessionType} from "../../../../types/session.type";
import SessionRescheduleModal
    from "../../../../components/sessions/session-reschedule-modal/session-reschedule-modal.component";
import EditSession from "../../sections/edit-session/edit-session.component";
import SessionsCards from "../../components/sessions-mobile-cards/sessions-mobile-cards.component";
import FormButton from "../../../../components/forms/form-button/form-button.component";
import ActionIcon from "../../../../components/action-icon/action-icon.component";
import {ReactComponent as CalendarIcon} from "../../../../assets/media/icons/calendar.svg";
import {SessionsState} from "../../../../store/reducers/sessions.reducer";
import {SessionFilter, SessionStatus} from "../../../../types/session.type";

interface Props {
  sessions: SessionsState;
  getSessions: (status: SessionStatus, filters?: SessionFilter) => (page: number) => void;
}

const MobileSessions: React.FC<Props> = (props) => {
    const {sessions, getSessions} = props;
    const [workingSession] = useState<SessionType|null>(null);
    const [rescheduleOpen, setRescheduleOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const {t} = useTranslation();
    const credits = -2 // temp

    const renderItemOptions = (item: SessionType) => {
        return (
            <div className="sessions__options">
                <FormButton onClick={() => setRescheduleOpen(true)}>{t('sessions:reschedule')}</FormButton>
                <ActionIcon
                    icon={CalendarIcon}
                    title="Calendar"
                    onClick={() => {}}
                />
            </div>
        )
    };

    return (
        <Styles credits={credits}>
            <div className="sessions__credits">
                <div>
                    <span>{t('sessions:current-credits')}</span>
                    <span>{credits}</span>
                </div>
                {credits < 0 ? <FormButton type="primary">{t('invoices:pay')}</FormButton> : null}
            </div>
            <SessionsCards
                renderOptions={renderItemOptions}
                title={t('sessions:upcoming-title')}
                getSessions={getSessions('upcoming')}
                sessions={sessions.upcoming}
            />
            <SessionsCards
                withFilter title={t('sessions:past-title')}
                getSessions={getSessions('past')}
                sessions={sessions.upcoming}
            />
            <SessionRescheduleModal
                onClose={() => setRescheduleOpen(false)}
                session={rescheduleOpen?workingSession:null}
            />
            <EditSession isOpen={editOpen} onClose={() => setEditOpen(false)}/>
        </Styles>
    );
};

export default MobileSessions;
