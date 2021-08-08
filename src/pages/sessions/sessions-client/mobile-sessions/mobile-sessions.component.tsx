import React, {useState, useMemo} from 'react';
import Styles from './mobile-sessions.styles';
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {useAuth} from "../../../../hooks/auth.hook";
import {SessionType} from "../../../../types/session.type";
import SessionRescheduleModal
    from "../../../../components/sessions/session-reschedule-modal/session-reschedule-modal.component";
import EditSession from "../../sections/edit-session/edit-session.component";
import SessionsCards from "../../components/sessions-mobile-cards/sessions-mobile-cards.component";
import moment from "moment";
import FormButton from "../../../../components/forms/form-button/form-button.component";
import ActionIcon from "../../../../components/action-icon/action-icon.component";
import {ReactComponent as CalendarIcon} from "../../../../assets/media/icons/calendar.svg";

const MobileSessions = () => {
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
            {/*<SessionsCards*/}
            {/*    renderOptions={renderItemOptions}*/}
            {/*    title={t('sessions:upcoming-title')}*/}
            {/*    data={upcomingSessions}*/}
            {/*/>*/}
            {/*<SessionsCards withFilter title={t('sessions:past-title')} data={pastSessions} />*/}
            <SessionRescheduleModal
                onClose={() => setRescheduleOpen(false)}
                session={rescheduleOpen?workingSession:null}
            />
            <EditSession isOpen={editOpen} onClose={() => setEditOpen(false)}/>
        </Styles>
    );
};

export default MobileSessions;
