import React, {useState, useEffect} from 'react';
import Styles from './client-hub.styles';
import {useParams} from "react-router";
import {useTranslation} from "../../modules/i18n/i18n.hook";
import {useDispatch} from "react-redux";
import {useClient} from "../../hooks/client.hook";
import {ACTION_GET_CLIENT_MINIMAL_REQUEST} from "../../store/action-types";
import {useTitle} from "../../hooks/title.hook";

type Props = {};
const ClientHub = ({}:Props) => {
    const {id} = useParams<{id: string}>();
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {data:client} = useClient();
    useEffect(() => {
        dispatch({type: ACTION_GET_CLIENT_MINIMAL_REQUEST, payload: id});
    }, []);
    useTitle(`Viewing ${client?.first_name||''} ${client?.last_name||''}`);
    return null;
};

export default ClientHub;
