import React, {useState, useEffect} from 'react';
import Styles from './mobile-invoices.styles';
import InfiniteScroll from "../../../components/infinite-scroll/infinite-scroll.component";
import {useInfiniteScroll} from "../../../hooks/infinite-scroll.hook";
import {invoices} from "../invoices.data";
import {TrainerInvoiceType} from "../../../types/invoice.type";
import {Link} from "react-router-dom";
import Card from "../../../components/card/card.style";
import {Routes} from "../../../enums/routes.enum";
import {OptionType} from "../../../types/option.type";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import {classes} from "../../../pipes/classes.pipe";
import MobileInvoicesFooter from "../../../components/invoices/mobile-invoices-footer/mobile-invoices-footer.component";
import MobileFilterDrawer from "../../../components/invoices/mobile-filter-drawer/mobile-filter-drawer.component";
import {useAuth} from "../../../hooks/auth.hook";
import userTypes from "../../../enums/user-types.enum";
import Overall from "../../../components/overall-card/overall-card.component";

type Props = {};
const MobileInvoices = ({}:Props) => {
    const [page, setPage] = useState(1);
    const {type} = useAuth();
    const {t} = useTranslation();
    useInfiniteScroll((p: number) => {
        setPage(p);
        return Promise.resolve(p - 1 > invoices.length / 10)
    });
    const overallValues: (OptionType & {type:string})[] = [
        {label: 'invoices:statuses.paid', value: '24', type: 'paid'},
        {label: 'invoices:statuses.outstanding', value: '3', type: 'outstanding'},
        {label: 'invoices:statuses.cancelled', value: '25', type: 'cancelled'},
    ];
    return (
        <Styles>
            <Overall>
                {
                    overallValues.map(({label, type, value}, i) => (
                        <Overall.Card label={t(label)} value={value} type={type} key={i}/>
                    ))
                }
            </Overall>
            {
                invoices.slice(0, page*10).map(({id, due_date, client_name, status, invoice_number}: TrainerInvoiceType, i) => (
                    <Link to={Routes.INVOICES+'/'+id} key={id} className={'invoices__item'}>
                        <Card className={'invoices__item__card'}>
                            <div className={'invoices__item__left'}>
                                <div className={'invoices__item__name'}>{client_name}</div>
                                <div className={'invoices__item__date'}>{due_date}</div>
                            </div>
                            <div className={'invoices__item__right'}>
                                <div className={'invoices__item__number'}>{invoice_number}</div>
                                <div className={classes('invoices__item__status', status.toLowerCase())}>{status}</div>
                            </div>
                        </Card>
                    </Link>
                ))
            }
            {
                type===userTypes.TRAINER?<MobileInvoicesFooter/>:null
            }
            <MobileFilterDrawer/>
        </Styles>
    )
};

export default MobileInvoices;
