import React, {useState, useEffect} from 'react';
import Styles from './mobile-client-footer.styles';
import BottomButton from "../../bottom-button/bottom-button.component";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import AddClientModal from "../add-client-modal/add-client-modal.component";

const MobileClientFooter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {t} = useTranslation();
    return (
        <>
            <BottomButton type={'primary'}
                          onClick={() => setIsOpen(true)}
            >{t('clients:add')}</BottomButton>
            <AddClientModal isOpen={isOpen} onClose={() => setIsOpen(false)}/>
        </>
    );
};

export default MobileClientFooter;
