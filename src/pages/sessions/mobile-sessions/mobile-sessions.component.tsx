import React, {useState, useEffect} from 'react';
import Styles from './mobile-sessions.styles';
import {OptionType} from "../../../types/option.type";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import {useAuth} from "../../../hooks/auth.hook";
import {useInfiniteScroll} from "../../../hooks/infinite-scroll.hook";
import {TrainerInvoiceType} from "../../../types/invoice.type";
import {Link} from "react-router-dom";
import {Routes} from "../../../enums/routes.enum";
import Card from "../../../components/card/card.style";
import {classes} from "../../../pipes/classes.pipe";
import userTypes from "../../../enums/user-types.enum";
import {sessions} from "../sessions.data";
import {toPmAm} from "../../../pipes/to-pm-am.pipe";
import Overall from "../../../components/overall-card/overall-card.component";
import MobileSessionFooter from "../../../components/sessions/mobile-session-footer/mobile-session-footer.component";
import MobileSessionFilter from "../../../components/sessions/mobile-session-filter/mobile-session-filter.component";
import SmallModal, {MenuItem} from "../../../components/small-modal/small-modal.component";
import {SessionType} from "../../../types/session.type";
import SessionRescheduleModal
    from "../../../components/sessions/session-reschedule-modal/session-reschedule-modal.component";
import SessionEditModal from "../../../components/sessions/session-edit-modal/session-edit-modal.component";

const MobileSessions = () => {
    const [page, setPage] = useState(1);
    const {type} = useAuth();
    const [workingSession, setWorkingSession] = useState<SessionType|null>(null);
    const [rescheduleOpen, setRescheduleOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [actionsOpen, setActionsOpen] = useState(false);
    const {t} = useTranslation();
    useInfiniteScroll((p: number) => {
        setPage(p);
        return Promise.resolve(p - 1 > sessions.length / 10)
    });
    const overallValues: (OptionType & {type:string})[] = [
        {label: 'sessions:completed', value: '24', type: 'success'},
        {label: 'sessions:paid', value: '3', type: 'default'},
        {label: 'sessions:open', value: '25', type: 'error'},
    ];
    const deleteSession = (session: SessionType) => {
        // todo: handle delete
        setWorkingSession(null);
    };
    const actions: MenuItem[] = type === userTypes.TRAINER?[
        {name: t('edit'), onClick: () => setEditOpen(true)},
        {name: t('delete'), onClick: () => deleteSession(workingSession as SessionType), type: 'primary'}
    ]:[
        {name: t('sessions:reschedule'), onClick: () => setRescheduleOpen(true)}
    ];
    return (
        <Styles>
            <Overall>
                {
                    overallValues.map(({label, type, value}) => (
                        <Overall.Card label={t(label)} value={value} type={type}/>
                    ))
                }
            </Overall>
            {
                sessions.slice(0, page*10).map(({id, name, date, time,type}) => (
                    <div key={id} className={'sessions__item'}
                    onClick={() =>{setWorkingSession({id, name, date, time,type}); setActionsOpen(true)}}>
                        <Card className={'sessions__item__card'}>
                            <div className={'sessions__item__left'}>
                                <div className={'sessions__item__name'}>{name}</div>
                                <div className={'sessions__item__date'}>{date} - {type.toUpperCase()}</div>
                            </div>
                            <div className={'sessions__item__right'}>
                                <div className={classes('sessions__item__time')}>{toPmAm(time)}</div>
                            </div>
                        </Card>
                    </div>
                ))
            }
            {
                type===userTypes.TRAINER?<MobileSessionFooter/>:null
            }
            <MobileSessionFilter/>
            <SmallModal visible={actionsOpen} onCancel={() => setActionsOpen(false)}
                        title={t('sessions:actions')} menu={actions}/>
            <SessionRescheduleModal onClose={() => setRescheduleOpen(false)} session={rescheduleOpen?workingSession:null}/>
            <SessionEditModal session={editOpen?workingSession:null} onClose={() => setEditOpen(false)}/>
        </Styles>
    );
};

export default MobileSessions;
