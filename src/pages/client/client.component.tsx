import React, {useState, useEffect} from 'react';
import Styles, {ActionStyle} from './client.styles';
import {useTitleContent} from "../../layouts/desktop-layout/desktop-layout.component";
import Link from "../../components/link/link.component";
import {Routes} from "../../enums/routes.enum";
import {useParams} from "react-router";
import {useTranslation} from "../../modules/i18n/i18n.hook";

type Props = {};
const Client = ({}:Props) => {
    const {id} = useParams<{id: string}>();
    const {t} = useTranslation();
    useTitleContent((
        <ActionStyle>
            <Link to={`${Routes.CLIENTS}/${id}${Routes.PROFILE}`}>{t('clients:view-profile')}</Link>
        </ActionStyle>
    ));
    return null;
};

export default Client;
