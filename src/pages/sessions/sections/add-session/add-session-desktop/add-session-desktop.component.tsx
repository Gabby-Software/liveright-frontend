import React, {useState, useEffect} from 'react';
import Styles from './add-session-desktop.styles';
import Modal from "../../../../../components/modal/modal.component";
import PageSubtitle from "../../../../../components/titles/page-subtitle.styles";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import AddSessionTop from "../add-session-top/add-session-top.component";
import AddSessionCalendar from "../add-session-calendar/add-session-calendar.component";
import AddSessionFieldsDesktop from "../add-session-fields-desktop/add-session-fields-desktop.component";
import AddSessionForm from "../add-session-form/add-session-form.component";
import {sessionData} from "../../edit-session/edit-session.data";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    forEdit?: boolean
};
const AddSessionDesktop = ({isOpen, onClose, forEdit}: Props) => {
    return (
        <Modal visible={isOpen} onCancel={onClose} large>
            <AddSessionForm onClose={onClose} initialValues={forEdit?sessionData:undefined}>
            <Styles>
                    <div className={'add-session__left'}>
                        <AddSessionTop/>
                        <AddSessionFieldsDesktop forEdit={forEdit}/>
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
