import React, {useState, useEffect} from 'react';
import Styles from './desktop-add-invoice-trigger.styles';
import FormButton from "../../forms/form-button/form-button.component";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import AddInvoiceModal from "../add-invoice-modal/add-invoice-modal.component";
import CreateInvoice from "../../../pages/invoices/components/create-invoice/create-invoice.component";

const DesktopAddInvoiceTrigger = () => {
    const {t} = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <Styles>
            <FormButton type={'primary'}
                        onClick={() => setIsModalOpen(true)}
            >{t('invoices:add')}</FormButton>
            <CreateInvoice isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </Styles>
    )
};

export default DesktopAddInvoiceTrigger;
