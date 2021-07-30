import React, {useState, useEffect} from 'react';
import Styles from './add-session-mobile.styles';
import BottomDrawer from "../../../../../components/bottom-drawer/bottom-drawer.component";
import AddSessionTop from "../add-session-top/add-session-top.component";
import AddSessionFieldsMobile from "../add-session-fields-mobile/add-session-fields-mobile.component";
import AddSessionForm from "../add-session-form/add-session-form.component";
import {sessionData} from "../../edit-session/edit-session.data";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    forEdit?: boolean;
};
const AddSessionMobile = ({isOpen, onClose, forEdit}: Props) => {
    return (
        <BottomDrawer isOpen={isOpen} onClose={onClose}>
            <BottomDrawer.Body>
                <AddSessionForm onClose={onClose} initialValues={forEdit?sessionData:undefined}>
                    <AddSessionTop/>
                    <AddSessionFieldsMobile forEdit={forEdit}/>
                </AddSessionForm>
            </BottomDrawer.Body>
        </BottomDrawer>
    )
};

export default AddSessionMobile;
