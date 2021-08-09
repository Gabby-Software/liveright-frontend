import React, {useState} from 'react';
import {Formik} from "formik";
import {Link} from "react-router-dom";
import Styles, {AwaitingCard, TitleContent, AddSessionAction, ManageTargetsAction} from './desktop-sessions.styles';
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {SessionFilter, SessionStatus, SessionType} from "../../../../types/session.type";
import {ReactComponent as CalendarIcon} from "../../../../assets/media/icons/calendar.svg";
import {ReactComponent as TrashIcon} from "../../../../assets/media/icons/trash.svg";
import {ReactComponent as RightArrowIcon} from "../../../../assets/media/icons/right-arrow.svg";
import ActionIcon from "../../../../components/action-icon/action-icon.component";
import SessionRescheduleModal
    from "../../../../components/sessions/session-reschedule-modal/session-reschedule-modal.component";
import SessionsTable from "../../components/sessions-table/sessions-table.component";
import FormButton from "../../../../components/forms/form-button/form-button.component";
import EditSession from "../../sections/edit-session/edit-session.component";
import {useTitleContent} from "../../../../layouts/desktop-layout/desktop-layout.component";
import {Routes} from "../../../../enums/routes.enum";
import FormSelect from "../../../../components/forms/form-select/form-select.component";
import AddSession from "../../sections/add-session/add-session.component";
import Tabs from "../../../../components/tabs/tabs.component";
import PageTitle from "../../../../components/titles/page-title.styles";
import {
    sessionDateRangeOptions,
} from "../../../../enums/session-filters.enum";
import SessionProgressItem from "../../components/session-progress-item/session-progress-item.component";
import Carousel from "../../../../components/carousel/carousel.component";
import {SessionsState} from "../../../../store/reducers/sessions.reducer";
import {useClients} from "../../../../hooks/clients.hook";
import SessionUserAvatar from "../../components/session-user-avatar/session-user-avatar.component";

interface Props {
    sessions: SessionsState;
    getSessions: (status: SessionStatus) => (page: number,filters?: SessionFilter) => void;
    onRemoveSession: (id: number) => void;
}

const DesktopSessions: React.FC<Props> = (props) => {
    const {sessions, getSessions, onRemoveSession} = props;
    const {upcoming, awaiting_scheduling, past} = sessions;
    const {t} = useTranslation();
    const clients = useClients();
    const [rescheduleOpen, setRescheduleOpen] = useState<SessionType|null>(null);
    const [addOpen, setAddOpen] = useState<boolean>(false);
    const [editOpen, setEditOpen] = useState<SessionType|null>(null);
    const [filteredClient, setFilteredClient] = useState(0);

    const renderUpcomingItemOptions = (item: SessionType) => {
        return (
            <div className="sessions__options">
                <FormButton onClick={() => setEditOpen(item)}>{t('sessions:edit-reschedule')}</FormButton>
                <Link to={Routes.CALENDAR}>
                    <ActionIcon
                        icon={CalendarIcon}
                        title="Calendar"
                        onClick={() =>{}}
                    />
                </Link>
                <ActionIcon
                    icon={TrashIcon}
                    title="Remove"
                    onClick={() => onRemoveSession(item.id)}
                />
            </div>
        )
    };

    const renderAwaitingContent = () => {
        return (
            <Carousel>
                {awaiting_scheduling.data.map((it) => {
                    const person = clients.data.data.find(client => client.id === it.client?.id)
                    return (
                        <AwaitingCard>
                            <SessionUserAvatar first_name={person?.first_name || ''} last_name={person?.last_name || ''} avatar={person?.avatar||undefined} />
                            <div className="schedule-button" onClick={() => setEditOpen(it)}>
                                <span>{t("sessions:schedule-now")}</span>
                                <RightArrowIcon />
                            </div>
                        </AwaitingCard>
                    )
                })}
            </Carousel>
        )
    }

    const renderUpcomingContent = () => {
        return (
            <SessionsTable
                sessions={upcoming}
                getSessions={getSessions('upcoming')}
                renderOptions={renderUpcomingItemOptions}
                withFilter
            />
        )
    }

    const renderPastContent = () => {
        return (
            <SessionsTable
                getSessions={getSessions('past')}
                sessions={past}
                withFilter
            />
        )
    }

    useTitleContent((
        <Formik onSubmit={() => {}} initialValues={{client_filter: ''}}>
            <TitleContent>
                <FormSelect
                    name="client_filter"
                    placeholder={t('sessions:filter-by-client')}
                    onUpdate={(id) => setFilteredClient(+id)}
                    options={clients.data.data.map(it => ({
                        label: `${it.first_name} ${it.last_name}`,
                        value: it.id.toString(),
                    }))}
                />
                <AddSessionAction type={'primary'} onClick={()=> setAddOpen(true)}>
                    {t('sessions:schedule-new')}
                </AddSessionAction>
            </TitleContent>
        </Formik>
    ));

    return (
      <Styles>
          <div className={'sessions'}>
              <Tabs tabs={[
                  {label: t('sessions:awaiting'), renderContent: renderAwaitingContent},
                  {label: t('sessions:upcoming'), renderContent: renderUpcomingContent},
                  {label: t('sessions:past'), renderContent: renderPastContent},
              ]} />

              <PageTitle>
                  {t('sessions:progress')}
                  <Formik onSubmit={() => {}} initialValues={{date_range: sessionDateRangeOptions[0].value}}>
                      <TitleContent>
                          <FormSelect name="date_range" options={sessionDateRangeOptions} />
                          <ManageTargetsAction type="ghost" onClick={()=> {}}>
                              {t('sessions:manage-targets')}
                          </ManageTargetsAction>
                      </TitleContent>
                  </Formik>
              </PageTitle>

              <div className="sessions__progress">
                  <div>
                    <span>{t("sessions:target")}</span>
                    <span>{t("sessions:current")}</span>
                  </div>
                  <SessionProgressItem label={t("sessions:consultation")} target={15} current={5} />
                  <SessionProgressItem label={t("sessions:ptSession")} target={20} current={6} />
                  <SessionProgressItem label={t("other")} target={10} current={5} />
                  <SessionProgressItem label={t("revenue")} target={500} current={350} />
              </div>
          </div>
          <SessionRescheduleModal session={rescheduleOpen} onClose={() => setRescheduleOpen(null)}/>
          <EditSession session={editOpen} isOpen={!!editOpen} onClose={() => setEditOpen(null)}/>
          <AddSession isOpen={addOpen} onClose={() => setAddOpen(false)}/>
      </Styles>
    );
};

export default DesktopSessions;
