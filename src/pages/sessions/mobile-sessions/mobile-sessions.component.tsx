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

const MobileSessions = () => {
    const [page, setPage] = useState(1);
    const {type} = useAuth();
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
                    <Link to={Routes.SESSIONS+'/'+id} key={id} className={'sessions__item'}>
                        <Card className={'sessions__item__card'}>
                            <div className={'sessions__item__left'}>
                                <div className={'sessions__item__name'}>{name}</div>
                                <div className={'sessions__item__date'}>{date} - {type.toUpperCase()}</div>
                            </div>
                            <div className={'sessions__item__right'}>
                                <div className={classes('sessions__item__time')}>{toPmAm(time)}</div>
                            </div>
                        </Card>
                    </Link>
                ))
            }
            {
                type===userTypes.TRAINER?<MobileSessionFooter/>:null
            }
            <MobileSessionFilter/>
        </Styles>
    );
};

export default MobileSessions;
