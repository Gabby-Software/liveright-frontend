import React, {useState, useEffect} from 'react';
import Styles from './mobile-invoices-footer.styles';
import FormButton from "../../forms/form-button/form-button.component";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import AddInvoiceModal from "../add-invoice-modal/add-invoice-modal.component";

const MobileInvoicesFooter = () => {
    const {t} = useTranslation();
    const [isFormOpen, setIsFormOpen] = useState(false);
    return (
        <Styles>
            <div className={'invoices-footer'}>
                <FormButton type={'primary'} className={'invoices-footer__add'}
                            onClick={() => setIsFormOpen(true)}
                >{t('invoices:add')}</FormButton>
            </div>
            <AddInvoiceModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}/>
        </Styles>
    );
};

export default MobileInvoicesFooter;
