import React from 'react';
import BottomDrawer from "../../../../../components/bottom-drawer/bottom-drawer.component";
import AddSessionTop from "../add-session-top/add-session-top.component";
import AddSessionFieldsMobile from "../add-session-fields-mobile/add-session-fields-mobile.component";
import AddSessionForm from "../add-session-form/add-session-form.component";
import {SessionType} from "../../../../../types/session.type";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    session?: SessionType;
};

const AddSessionMobile = ({isOpen,onClose,session}: Props) => {
    return (
        <BottomDrawer isOpen={isOpen} onClose={onClose}>
            <BottomDrawer.Body>
                <AddSessionForm onClose={onClose} session={session}>
                    <AddSessionTop session={session} />
                    <AddSessionFieldsMobile onClose={onClose} session={session} />
                </AddSessionForm>
            </BottomDrawer.Body>
        </BottomDrawer>
    )
};

export default AddSessionMobile;
