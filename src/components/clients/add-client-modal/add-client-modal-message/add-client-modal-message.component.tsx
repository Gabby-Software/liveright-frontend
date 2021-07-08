import React, {useState, useEffect, useContext} from 'react';
import Styles from './add-client-modal-message.styles';
import {ClientFormContext, clientFormSteps, ClientFormType} from "../add-client-modal.context";
import FormButton from "../../../forms/form-button/form-button.component";
import {Form, Formik, FormikHelpers} from "formik";
import {toast} from "../../../toast/toast.component";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import * as Yup from 'yup';
import FormTextarea from "../../../forms/form-textarea/form-textarea.component";
import ButtonSubmit from "../../../forms/button-submit/button-submit.component";

type Props = {};
const AddClientModalMessage = ({}: Props) => {
    const {step, setStep, form, update, onClose} = useContext(ClientFormContext);
    const {t} = useTranslation();
    const handleSubmit = (values: ClientFormType, helper: FormikHelpers<ClientFormType>) => {
        helper.setSubmitting(false);
        toast.show({type: 'success', msg: t('alerts:client-add-success')});
        onClose();
    };
    return (
        <Styles style={{maxWidth: step === clientFormSteps.MESSAGE ? '100%' : 0}}>
            <div className={'client-add__message__wrap'}>
                <p className={'client-add__message__desc'}><span>{form.email}</span> {t('clients:client-exist')}</p>
                <Formik
                    onSubmit={handleSubmit}
                    initialValues={form}
                    validationSchema={Yup.object({
                        message: Yup.string().required()
                    })}
                >
                    <Form>
                        <FormTextarea name={'message'} label={'Message'} onUpdate={update}/>
                        <ButtonSubmit>{t('submit')}</ButtonSubmit>
                        <FormButton type={'default'}
                                    onClick={() => setStep(clientFormSteps.EMAIL)}>{t('back')}</FormButton>
                    </Form>
                </Formik>
            </div>
        </Styles>
    );
};

export default AddClientModalMessage;
