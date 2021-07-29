import React, {useState, useEffect} from 'react';
import Styles from './add-session-mobile.styles';
import BottomDrawer from "../../../../../components/bottom-drawer/bottom-drawer.component";
import AddSessionTop from "../add-session-top/add-session-top.component";
import AddSessionFieldsMobile from "../../../add-session/add-session-fields-mobile/add-session-fields-mobile.component";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};
const AddSessionMobile = ({isOpen, onClose}: Props) => {
    return (
        <BottomDrawer isOpen={isOpen} onClose={onClose}>
            <BottomDrawer.Body>
                <AddSessionTop/>
                <AddSessionFieldsMobile/>
            </BottomDrawer.Body>
        </BottomDrawer>
    )
};

export default AddSessionMobile;
