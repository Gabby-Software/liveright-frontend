import React, {useState, useEffect} from 'react';
import Styles from './clients-mobile.styles';
import {useInfiniteScroll} from "../../../hooks/infinite-scroll.hook";
import {clients} from "../clients.data";
import Card from "../../../components/card/card.style";
import {classes} from "../../../pipes/classes.pipe";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import MobileClientFooter from "../../../components/clients/mobile-client-footer/mobile-client-footer.component";
import ClientsFilterMobile from "../../../components/clients/clients-filter-mobile/clients-filter-mobile.component";
import PopOnScroll from "../../../components/pop-on-scroll/pop-on-scroll.component";
import {useDispatch} from "react-redux";
import {useClients} from "../../../hooks/clients.hook";
import {ACTION_GET_CLIENTS_REQUEST} from "../../../store/action-types";
import DataPagination from "../../../components/data-pagination/data-pagination.component";
import {Link} from "react-router-dom";
import {Routes} from "../../../enums/routes.enum";
import logger from "../../../managers/logger.manager";

const ClientsMobile = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {data: {data, meta}, filters} = useClients();
    const setPage = (page: number) => {
        dispatch({
            type: ACTION_GET_CLIENTS_REQUEST, payload: {
                page,
                query: filters.query,
                status: filters.status
            }
        });
    };
    return (
        <Styles>
            <div className={'clients__heading'}>
                {
                    data.map(({first_name, last_name, id, user_uuid, sessions, status}) => {
                        const Wrapper = status === 'awaiting' ? ({children}:any) => <a>{children}</a> : Link;
                        return (
                        <PopOnScroll offset={100}>
                            <Wrapper to={`${Routes.CLIENTS}/${user_uuid}`}>
                                <Card className={classes('clients__card')} key={id}>
                                    <div className={classes('clients__name')}>{first_name} {last_name}</div>
                                    <div
                                        className={'clients__label'}>{t('clients:sessions-remind', {n: sessions || 0})}</div>
                                </Card>
                            </Wrapper>
                        </PopOnScroll>
                    )})
                }
                <DataPagination page={meta.current_page} setPage={setPage} total={meta.total}/>
            </div>
            <ClientsFilterMobile/>
            <MobileClientFooter/>
        </Styles>
    )
};

export default ClientsMobile;
