import React, {useState, useEffect} from 'react';
import Styles from './mobile-client-footer.styles';
import BottomButton from "../../bottom-button/bottom-button.component";
import {useTranslation} from "../../../modules/i18n/i18n.hook";

type Props = {};
const MobileClientFooter = ({}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const {t} = useTranslation();
    return (
        <>
            <BottomButton type={'primary'}
                          onClick={() => setIsOpen(true)}
            >{t('clients:add')}</BottomButton>
        </>
    );
};

export default MobileClientFooter;
