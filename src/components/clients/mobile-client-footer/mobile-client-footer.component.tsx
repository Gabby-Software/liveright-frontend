import React, {useState, useEffect} from 'react';
import Styles from './mobile-client-footer.styles';
import BottomButton from "../../bottom-button/bottom-button.component";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import AddClientModal from "../add-client-modal/add-client-modal.component";
import {useClients} from "../../../hooks/clients.hook";
import {useDispatch} from "react-redux";
import {ACTION_GET_CLIENTS_REQUEST} from "../../../store/action-types";

const MobileClientFooter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {t} = useTranslation();
    const {filters} = useClients();
    const dispatch = useDispatch();
    const refetchClients = () => {
        dispatch({
            type: ACTION_GET_CLIENTS_REQUEST, payload: {
                ...filters,
                page: 1
            }
        })
    }
    return (
        <>
            <BottomButton type={'primary'}
                          onClick={() => setIsOpen(true)}
            >{t('clients:add')}</BottomButton>
            <AddClientModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={refetchClients}/>
        </>
    );
};

export default MobileClientFooter;
