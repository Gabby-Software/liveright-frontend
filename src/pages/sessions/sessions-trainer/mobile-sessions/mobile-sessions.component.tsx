import React, {useState} from 'react';
import Styles from './mobile-sessions.styles';
import {Formik} from "formik";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {SessionStatus, SessionType} from "../../../../types/session.type";
import SessionRescheduleModal
    from "../../../../components/sessions/session-reschedule-modal/session-reschedule-modal.component";
import EditSession from "../../sections/edit-session/edit-session.component";
import SessionsCards from "../../components/sessions-mobile-cards/sessions-mobile-cards.component";
import FormButton from "../../../../components/forms/form-button/form-button.component";
import ActionIcon from "../../../../components/action-icon/action-icon.component";
import {ReactComponent as CalendarIcon} from "../../../../assets/media/icons/calendar.svg";
import Tabs from "../../../../components/tabs/tabs.component";
import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {ReactComponent as RightArrowIcon} from "../../../../assets/media/icons/right-arrow.svg";
import {Link} from "react-router-dom";
import {Routes} from "../../../../enums/routes.enum";
import {ReactComponent as TrashIcon} from "../../../../assets/media/icons/trash.svg";
import {ReactComponent as FilterIcon} from "../../../../assets/media/icons/filter.svg";
import {ReactComponent as AddIcon} from "../../../../assets/media/icons/add.svg";
import {sessionDateRangeOptions} from "../../../../enums/session-filters.enum";
import FormSelect from "../../../../components/forms/form-select/form-select.component";
import SessionProgressItem from "../../components/session-progress-item/session-progress-item.component";
import {AwaitingCard, Form, ManageTargetsAction, TitleContent} from "./mobile-sessions.styles";
import DataPagination from "../../../../components/data-pagination/data-pagination.component";
import AddSession from "../../sections/add-session/add-session.component";
import {useMobileTitleContent} from "../../../../layouts/mobile-layout/mobile-layout.component";
import SmallModal from "../../../../components/small-modal/small-modal.component";
import {SessionsState} from "../../../../store/reducers/sessions.reducer";

interface Props {
  sessions: SessionsState;
  getSessions: (status: SessionStatus) => (page: number) => void;
}

const MobileSessions: React.FC<Props> = (props) => {
    const {sessions, getSessions} = props;
    const {upcoming, awaiting_scheduling, past} = sessions;
    const awaitingMeta = awaiting_scheduling.meta;
    const {t} = useTranslation();
    const [workingSession] = useState<SessionType|null>(null);
    const [rescheduleOpen, setRescheduleOpen] = useState(false);
    const [addOpen, setAddOpen] = useState<boolean>(false);
    const [editOpen, setEditOpen] = useState<SessionType|null>(null);
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
                <ActionIcon
                    icon={TrashIcon}
                    title="Remove"
                    onClick={() =>{}}
                />
            </div>
        )
    };

    const renderAwaitingContent = () => {
        return (
            <div>
                {awaiting_scheduling.data.map((it) => (
                    <AwaitingCard>
                        <div>
                            <Avatar size="small" icon={<UserOutlined />} />
                            {it.client?.first_name} {it.client?.last_name}
                        </div>
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
              title={t('sessions:filter-by-client')}
              onClick={() => setIsFilterOpen(true)}
          />
          <ActionIcon
              icon={AddIcon}
              title={t('sessions:schedule-new')}
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
            <SessionRescheduleModal
                onClose={() => setRescheduleOpen(false)}
                session={rescheduleOpen?workingSession:null}
            />
            <EditSession session={editOpen} isOpen={!!editOpen} onClose={() => setEditOpen(null)}/>
            <AddSession isOpen={addOpen} onClose={() => setAddOpen(false)}/>
            <SmallModal
                onCancel={() => setIsFilterOpen(false)}
                visible={isFilterOpen}
                title={t('sessions:filter-by-client')}
                menu={[]}
            />
        </Styles>
    );
};

export default MobileSessions;
