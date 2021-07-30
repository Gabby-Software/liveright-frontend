import React, {useState, useEffect} from 'react';
import Styles from './edit-session.styles';
import {useIsMobile} from "../../../../hooks/is-mobile.hook";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import AddSessionMobile from "../add-session/add-session-mobile/add-session-mobile.component";
import AddSessionDesktop from "../add-session/add-session-desktop/add-session-desktop.component";

type Props = {
    isOpen: boolean;
    onClose: () => void
};
const EditSession = ({isOpen, onClose}:Props) => {
    const isMobile = useIsMobile();
    return isMobile ? (
        <AddSessionMobile isOpen={isOpen} onClose={onClose} forEdit/>
    ) : (
        <AddSessionDesktop isOpen={isOpen} onClose={onClose} forEdit/>
    )
};

export default EditSession;
