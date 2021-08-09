import React, {useState} from 'react';
import Styles, {TitleContent} from './desktop-sessions.styles';
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {SessionType} from "../../../../types/session.type";
import {ReactComponent as CalendarIcon} from "../../../../assets/media/icons/calendar.svg";
import ActionIcon from "../../../../components/action-icon/action-icon.component";
import SessionRescheduleModal
    from "../../../../components/sessions/session-reschedule-modal/session-reschedule-modal.component";
import SessionAddModal
    from "../../../../components/sessions/session-add-modal/session-add-modal.component";
import PageSubtitle from '../../../../components/titles/page-subtitle.styles'
import SessionsTable from "../../components/sessions-table/sessions-table.component";
import FormButton from "../../../../components/forms/form-button/form-button.component";
import EditSession from "../../sections/edit-session/edit-session.component";
import {useTitleContent} from "../../../../layouts/desktop-layout/desktop-layout.component";
import {Routes} from "../../../../enums/routes.enum";
import {Link} from "react-router-dom";
import {SessionsState} from "../../../../store/reducers/sessions.reducer";
import {SessionFilter, SessionStatus} from "../../../../types/session.type";
import {useClientsTrainer} from "../../../../hooks/clients-trainer.hook";

interface Props {
  sessions: SessionsState;
  getSessions: (status: SessionStatus, filters?: SessionFilter) => (page: number) => void;
}

const DesktopSessions: React.FC<Props> = (props) => {
    const {getSessions, sessions} = props;
    const {t} = useTranslation();
    const trainer = useClientsTrainer();
    const [rescheduleOpen, setRescheduleOpen] = useState<SessionType|null>(null);
    const [editOpen, setEditOpen] = useState<SessionType|null>(null);
    const [addOpen, setAddOpen] = useState<boolean>(false);
    const credits = -2 // temp

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

    useTitleContent(trainer ? (
        <TitleContent credits={credits}>
          <div className="credits">
            <span>{t('sessions:current-credits')}</span>
            <span>{credits}</span>
          </div>
          <FormButton onClick={() => setAddOpen(true)} type="primary">{t('sessions:session-request')}</FormButton>
        </TitleContent>
    ) : null);

    return (
      <Styles>
          <div className={'sessions'}>
              <PageSubtitle>{t('sessions:upcoming-title')}</PageSubtitle>
              <SessionsTable
                  sessions={sessions.upcoming}
                  getSessions={getSessions('upcoming')}
                  renderOptions={renderItemOptions}
              />

              <PageSubtitle>{t('sessions:past-title')}</PageSubtitle>
              <SessionsTable
                  sessions={sessions.past}
                  getSessions={getSessions('past')}
                  withFilter
              />
          </div>
          <SessionRescheduleModal session={rescheduleOpen} onClose={() => setRescheduleOpen(null)}/>
          <EditSession isOpen={!!editOpen} onClose={() => setEditOpen(null)}/>
         {trainer?.accounts ? (
             <SessionAddModal trainer_id={trainer.accounts.find(it => it.type === 'trainer')!.id} isOpen={addOpen} onClose={() => setAddOpen(false)}/>
         ) : null}
      </Styles>
    );
};

export default DesktopSessions;
