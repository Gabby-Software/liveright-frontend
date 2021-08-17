import React, {useState, useEffect, FC} from 'react';
import Styles from './create-invoice-mobile-actions.styles';
import FormButton from "../../../../../components/forms/form-button/form-button.component";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import ButtonSubmit from "../../../../../components/forms/button-submit/button-submit.component";
import {useInvoiceForm} from "../../../create-invoice.context";

type Props = {
    back?: number;
};
const CreateInvoiceMobileActions: FC<Props> = ({back}) => {
    const {t} = useTranslation();
    const {setStep} = useInvoiceForm();
    return (
        <Styles>
            {
                back!==undefined?(
                    <FormButton type={'default'} className={'ci-actions__back'}
                    onClick={() => setStep(back)}>{t('back')}</FormButton>
                ):null
            }
            <ButtonSubmit className={'ci-actions__next'}>{t('next')}</ButtonSubmit>
        </Styles>
    )
};

export default CreateInvoiceMobileActions;
