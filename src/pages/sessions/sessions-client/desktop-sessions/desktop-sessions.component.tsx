import React, {useState, useMemo} from 'react';
import moment from 'moment'
import Styles, {TitleContent} from './desktop-sessions.styles';
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {SessionType} from "../../../../types/session.type";
import {ReactComponent as CalendarIcon} from "../../../../assets/media/icons/calendar.svg";
import ActionIcon from "../../../../components/action-icon/action-icon.component";
import SessionRescheduleModal
    from "../../../../components/sessions/session-reschedule-modal/session-reschedule-modal.component";
import SessionEditModal from "../../../../components/sessions/session-edit-modal/session-edit-modal.component";
import PageSubtitle from '../../../../components/titles/page-subtitle.styles'
import SessionsTable from "../../components/sessions-table/sessions-table.component";
import FormButton from "../../../../components/forms/form-button/form-button.component";
import EditSession from "../../sections/edit-session/edit-session.component";
import {useTitleContent} from "../../../../layouts/desktop-layout/desktop-layout.component";
import {SettingsLink} from "../../../notifications/notifications.styles";
import {Routes} from "../../../../enums/routes.enum";
import {Link} from "react-router-dom";

const DesktopSessions = () => {
    const {t} = useTranslation();
    const [rescheduleOpen, setRescheduleOpen] = useState<SessionType|null>(null);
    const [editOpen, setEditOpen] = useState<SessionType|null>(null);
    const credits = -2 // temp
    const sessions: SessionType[] = [];

    const renderItemOptions = (item: SessionType) => {
        return (
            <div className="sessions__options">
                <FormButton onClick={() => setRescheduleOpen(item)}>{t('sessions:reschedule')}</FormButton>
                <Link to={Routes.CALENDAR}>
                <ActionIcon
                    icon={CalendarIcon}
                    title="Calendar"
                    onClick={() =>{}}
                />
                </Link>
            </div>
        )
    };

    useTitleContent((
        <TitleContent credits={credits}>
            <div className="credits">
                <span>{t('sessions:current-credits')}</span>
                <span>{credits}</span>
            </div>
            <FormButton type="primary">{t('sessions:session-request')}</FormButton>
        </TitleContent>
    ));

    return (
      <Styles>
          <div className={'sessions'}>
              <PageSubtitle>{t('sessions:upcoming-title')}</PageSubtitle>
              {/*<SessionsTable data={upcomingSessions} renderOptions={renderItemOptions} />*/}

              <PageSubtitle>{t('sessions:past-title')}</PageSubtitle>
              {/*<SessionsTable data={pastSessions} withFilter />*/}
          </div>
          <SessionRescheduleModal session={rescheduleOpen} onClose={() => setRescheduleOpen(null)}/>
          <EditSession isOpen={!!editOpen} onClose={() => setEditOpen(null)}/>
      </Styles>
    );
};

export default DesktopSessions;
