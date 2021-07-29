import React, {useState, useEffect, useMemo, useCallback} from 'react';
import Styles from './add-session.styles';
import {useIsMobile} from "../../../../hooks/is-mobile.hook";
import {Formik, Form, FormikHelpers} from "formik";
import * as Yup from 'yup';
import moment from 'moment';
import BottomDrawer from "../../../../components/bottom-drawer/bottom-drawer.component";
import Modal from "../../../../components/modal/modal.component";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import PageSubtitle from "../../../../components/titles/page-subtitle.styles";
import AddSessionForm from "./add-session-form/add-session-form.component";
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
