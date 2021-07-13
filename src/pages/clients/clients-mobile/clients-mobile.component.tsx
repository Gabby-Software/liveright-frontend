import React, {useState, useEffect} from 'react';
import Styles from './clients-mobile.styles';
import {useInfiniteScroll} from "../../../hooks/infinite-scroll.hook";
import {clients} from "../clients.data";
import Card from "../../../components/card/card.style";
import {classes} from "../../../pipes/classes.pipe";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import MobileClientFooter from "../../../components/clients/mobile-client-footer/mobile-client-footer.component";
import ClientsFilterMobile from "../../../components/clients/clients-filter-mobile/clients-filter-mobile.component";

const ClientsMobile = () => {
    const [page, setPage] = useState(1);
    const {t} = useTranslation();
    useInfiniteScroll((page:number) => {
        setPage(page);
        return Promise.resolve(page >= clients.length/10);
    });
    return (
        <Styles>
            <div className={'clients__heading'}>
                {
                    clients.slice(0, page*10).map(({first_name, last_name, sessions,id}) => (
                        <Card className={classes('clients__card')} key={id}>
                            <div className={classes('clients__name')}>{first_name} {last_name}</div>
                            <div className={'clients__label'}>{t('clients:sessions-remind',{n:sessions})}</div>
                        </Card>
                    ))
                }
            </div>
            <ClientsFilterMobile/>
            <MobileClientFooter/>
        </Styles>
    )
};

export default ClientsMobile;
