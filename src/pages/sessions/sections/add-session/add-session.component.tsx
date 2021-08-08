import React from 'react';
import {useIsMobile} from "../../../../hooks/is-mobile.hook";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import AddSessionDesktop from "./add-session-desktop/add-session-desktop.component";
import AddSessionMobile from "./add-session-mobile/add-session-mobile.component";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const AddSession = ({isOpen, onClose}: Props) => {
    const isMobile = useIsMobile();
    const {t} = useTranslation();
    return isMobile ? (
        <AddSessionMobile isOpen={isOpen} onClose={onClose}/>
    ) : (
        <AddSessionDesktop isOpen={isOpen} onClose={onClose}/>
    )
};

export default AddSession;
