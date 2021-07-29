import React, {useState, useEffect} from 'react';
import Styles from './add-session-desktop.styles';
import Modal from "../../../../../components/modal/modal.component";
import PageSubtitle from "../../../../../components/titles/page-subtitle.styles";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import AddSessionTop from "../add-session-top/add-session-top.component";
import AddSessionCalendar from "../add-session-calendar/add-session-calendar.component";
import AddSessionFieldsDesktop from "../add-session-fields-desktop/add-session-fields-desktop.component";
import AddSessionForm from "../add-session-form/add-session-form.component";

type Props = {
    isOpen: boolean;
    onClose: () => void
};
const AddSessionDesktop = ({isOpen, onClose}: Props) => {
    const {t} = useTranslation();
    return (
        <Modal visible={isOpen} onCancel={onClose} large>
            <AddSessionForm onClose={onClose}>
            <Styles>
                    <div className={'add-session__left'}>
                        <AddSessionTop/>
                        <AddSessionFieldsDesktop/>
                    </div>
                    <div className={'add-session__right'}>
                        <AddSessionCalendar/>
                    </div>
            </Styles>
            </AddSessionForm>
        </Modal>
    );
};

export default AddSessionDesktop;
