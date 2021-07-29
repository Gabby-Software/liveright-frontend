import React, {useState, useEffect} from 'react';
import Styles from './add-session-mobile.styles';
import BottomDrawer from "../../../../../components/bottom-drawer/bottom-drawer.component";
import AddSessionTop from "../add-session-top/add-session-top.component";
import AddSessionFieldsMobile from "../add-session-fields-mobile/add-session-fields-mobile.component";
import AddSessionForm from "../add-session-form/add-session-form.component";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};
const AddSessionMobile = ({isOpen, onClose}: Props) => {
    return (
        <BottomDrawer isOpen={isOpen} onClose={onClose}>
            <BottomDrawer.Body>
                <AddSessionForm onClose={onClose}>
                    <AddSessionTop/>
                    <AddSessionFieldsMobile/>
                </AddSessionForm>
            </BottomDrawer.Body>
        </BottomDrawer>
    )
};

export default AddSessionMobile;
