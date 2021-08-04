import React, {useState, useEffect} from 'react';
import Styles, {ActionStyle} from './client.styles';
import {useTitleContent} from "../../layouts/desktop-layout/desktop-layout.component";
import Link from "../../components/link/link.component";
import {Routes} from "../../enums/routes.enum";
import {useParams} from "react-router";
import {useTranslation} from "../../modules/i18n/i18n.hook";
import {useTitle} from "../../hooks/title.hook";
import {useDispatch} from "react-redux";
import {ACTION_GET_CLIENT_MINIMAL_REQUEST} from "../../store/action-types";
import {useClients} from "../../hooks/clients.hook";
import {useClient} from "../../hooks/client.hook";
import logger from "../../managers/logger.manager";

type Props = {};
const Client = ({}:Props) => {
    const {id} = useParams<{id: string}>();
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {data:client} = useClient();
    useEffect(() => {
        dispatch({type: ACTION_GET_CLIENT_MINIMAL_REQUEST, payload: id});
    }, []);
    useTitle(`Viewing ${client?.first_name||''} ${client?.last_name||''}`);
    useTitleContent((
        <ActionStyle>
            <Link to={`${Routes.CLIENTS}/${id}${Routes.PROFILE}`}>{t('clients:view-profile')}</Link>
        </ActionStyle>
    ));
    return null;
};

export default Client;
