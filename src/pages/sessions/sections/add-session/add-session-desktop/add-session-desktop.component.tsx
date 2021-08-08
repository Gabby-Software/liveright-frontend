import React from 'react';
import Styles from './add-session-desktop.styles';
import Modal from "../../../../../components/modal/modal.component";
import AddSessionTop from "../add-session-top/add-session-top.component";
import AddSessionCalendar from "../add-session-calendar/add-session-calendar.component";
import AddSessionFieldsDesktop from "../add-session-fields-desktop/add-session-fields-desktop.component";
import AddSessionForm from "../add-session-form/add-session-form.component";
import {SessionType} from "../../../../../types/session.type";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    session?: SessionType | null;
    forEdit?: boolean;
};
const AddSessionDesktop = ({isOpen, onClose, forEdit, session}: Props) => {
    return (
        <Modal visible={isOpen} onCancel={onClose} large>
            <AddSessionForm onClose={onClose} session={session}>
              <Styles>
                      <div className={'add-session__left'}>
                          <AddSessionTop forEdit={forEdit} />
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
