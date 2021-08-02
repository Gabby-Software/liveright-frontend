import React, {useState, useEffect} from 'react';
import Styles from './clients.styles';
import {useIsMobile} from "../../hooks/is-mobile.hook";
import ClientsDesktop from "./clients-desktop/clients-desktop.component";
import ClientsMobile from "./clients-mobile/clients-mobile.component";
import {onlyTrainer} from "../../guards/trainer.guard";
import APIGet from "../../hoc/api-get";
import {EP_GET_CLIENTS} from "../../enums/api.enum";
import {Skeleton} from "antd";
import {useClients} from "../../hooks/clients.hook";
import api from "../../managers/api.manager";
import {useDispatch} from "react-redux";
import {ACTION_GET_CLIENTS_REQUEST} from "../../store/action-types";
import logger from "../../managers/logger.manager";

const Clients = () => {
    const isMobile = useIsMobile();
    const {loading, error, data} = useClients();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: ACTION_GET_CLIENTS_REQUEST, payload: {}});
    }, []);
    if (loading)
        return <Skeleton/>;
    if (error)
        return <p>{error}</p>;
    return isMobile ? <ClientsMobile/> : <ClientsDesktop/>
};

export default onlyTrainer(Clients);
