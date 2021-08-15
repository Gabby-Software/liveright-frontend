import React, {useState} from 'react';
import {Formik} from "formik";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {SessionFilter, SessionStatus, SessionType} from "../../../../types/session.type";
import SessionsCards from "../../components/sessions-mobile-cards/sessions-mobile-cards.component";
import FormButton from "../../../../components/forms/form-button/form-button.component";
import ActionIcon from "../../../../components/action-icon/action-icon.component";
import {ReactComponent as CalendarIcon} from "../../../../assets/media/icons/calendar.svg";
import Tabs from "../../../../components/tabs/tabs.component";
import {ReactComponent as RightArrowIcon} from "../../../../assets/media/icons/right-arrow.svg";
import {Link} from "react-router-dom";
import {Routes} from "../../../../enums/routes.enum";
import {ReactComponent as FilterIcon} from "../../../../assets/media/icons/filter.svg";
import {ReactComponent as AddIcon} from "../../../../assets/media/icons/add.svg";
import {sessionDateRangeOptions} from "../../../../enums/session-filters.enum";
import FormSelect from "../../../../components/forms/form-select/form-select.component";
import SessionProgressItem from "../../components/session-progress-item/session-progress-item.component";
import DataPagination from "../../../../components/data-pagination/data-pagination.component";
import {useMobileTitleContent} from "../../../../layouts/mobile-layout/mobile-layout.component";
import SmallModal, {MenuItem} from "../../../../components/small-modal/small-modal.component";
import {SessionsState} from "../../../../store/reducers/sessions.reducer";
import SessionUserAvatar from "../../components/session-user-avatar/session-user-avatar.component";
import AddSessionMobile from "../../sections/add-session/add-session-mobile/add-session-mobile.component";
import {useClients} from "../../../../hooks/clients.hook";
import Styles, {
  AwaitingCard,
  Form,
  ManageTargetsAction,
  TitleContent
} from "./mobile-sessions.styles";

interface Props {
  sessions: SessionsState;
  getSessions: (status: SessionStatus) => (page: number, filters?: SessionFilter) => void;
  onRemoveSession: (id: number) => void;
}

const MobileSessions: React.FC<Props> = (props) => {
    const {sessions, getSessions, onRemoveSession} = props;
    const {upcoming, awaiting_scheduling, past} = sessions;
    const awaitingMeta = awaiting_scheduling.meta;
    const {t} = useTranslation();
    const clients = useClients();
    const clientsData = clients.data.data;
    const [addOpen, setAddOpen] = useState<boolean>(false);
    const [editOpen, setEditOpen] = useState<SessionType>();
    const [isFilterOpen, setIsFilterOpen] = useState(false);

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
            </div>
        )
    };

    const renderAwaitingContent = () => {
        return (
            <div>
                {awaiting_scheduling.data.map((it) => (
                    <AwaitingCard>
                        <SessionUserAvatar
                            avatar={it.client?.user.avatar}
                            first_name={it.client?.user.first_name}
                            last_name={it.client?.user.last_name}
                        />
                        <div className="schedule-button" onClick={() => setEditOpen(it)}>
                            <span>{t("sessions:schedule-now")}</span>
                            <RightArrowIcon />
                        </div>
                    </AwaitingCard>
                ))}
                <DataPagination
                    page={awaitingMeta.current_page}
                    setPage={getSessions('awaiting_scheduling')}
                    total={awaitingMeta.current_page}
                />
            </div>
        )
    }

    const renderUpcomingContent = () => {
        return (
            <SessionsCards
                withFilter
                renderOptions={renderUpcomingItemOptions}
                sessions={upcoming}
                getSessions={getSessions('upcoming')}
                onRemoveSession={onRemoveSession}
            />
        )
    }

    const renderPastContent = () => {
        return (
            <SessionsCards
                withFilter
                sessions={past}
                getSessions={getSessions('past')}
            />
        )
    }

    useMobileTitleContent((
        <TitleContent>
          <ActionIcon
              icon={FilterIcon}
              onClick={() => setIsFilterOpen(true)}
          />
          <ActionIcon
              icon={AddIcon}
              onClick={() => setAddOpen(true)}
          />
        </TitleContent>
    ));

    return (
        <Styles>
            <Tabs tabs={[
                {label: t('sessions:awaiting'), renderContent: renderAwaitingContent},
                {label: t('sessions:upcoming'), renderContent: renderUpcomingContent},
                {label: t('sessions:past'), renderContent: renderPastContent},
            ]} />

            <div className="sessions__progress">
                <h1 className={'mobile-layout__title'}>{t('sessions:progress')}</h1>
                <Formik onSubmit={() => {}} initialValues={{date_range: sessionDateRangeOptions[0].value}}>
                    <Form>
                        <FormSelect name="date_range" options={sessionDateRangeOptions} />
                    </Form>
                </Formik>
                <div className="sessions__progress__labels">
                    <span>{t("sessions:target")}</span>
                    <span>{t("sessions:current")}</span>
                </div>
                <SessionProgressItem row label={t("sessions:consultation")} target={15} current={5} />
                <SessionProgressItem row label={t("sessions:ptSession")} target={20} current={6} />
                <SessionProgressItem row label={t("other")} target={10} current={5} />
                <SessionProgressItem row label={t("revenue")} target={500} current={350} />
            </div>
            <ManageTargetsAction type="ghost" onClick={()=> {}}>
                {t('sessions:manage-targets')}
            </ManageTargetsAction>
            <AddSessionMobile
                isOpen={!!editOpen}
                session={editOpen}
                onClose={() => setEditOpen(undefined)}
            />
            <AddSessionMobile isOpen={addOpen} onClose={() => setAddOpen(false)} />
            <SmallModal
                onCancel={() => setIsFilterOpen(false)}
                visible={isFilterOpen}
                title={t('sessions:filter-by-client')}
                menu={[{name: 'All', value: 'All', onClick: () => {}}].concat(clientsData.map((client) => ({
                  name: `${client.first_name} ${client.last_name}`,
                  value: client.id.toString(),
                  onClick: () => {},
                }))) as MenuItem[]}
            />
        </Styles>
    );
};

export default MobileSessions;
