import React, {useState, useEffect} from 'react';
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import BottomButton from "../../bottom-button/bottom-button.component";
import SessionAddModal from "../session-add-modal/session-add-modal.component";
import AddSession from "../../../pages/sessions/sections/add-session/add-session.component";

const MobileSessionFooter = () => {
    const {t} = useTranslation();
    const [isFormOpen, setIsFormOpen] = useState(false);
    return (
        <>
            <BottomButton type={'primary'} className={'sessions-footer__add'}
                          onClick={() => setIsFormOpen(true)}
            >{t('sessions:add')}</BottomButton>
            <AddSession isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}/>
            {/*<SessionAddModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}/>*/}

        </>
    );
};

export default MobileSessionFooter;
