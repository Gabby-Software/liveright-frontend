import React, {useContext} from 'react';
import Styles from './add-client-modal-email.styles';
import {ClientFormContext, clientFormSteps, ClientFormType} from "../add-client-modal.context";
import {Form, Formik, FormikHelpers} from "formik";
import * as Yup from 'yup';
import FormInputLabeled from "../../../forms/form-input-labeled/form-input-labeled.component";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import ButtonSubmit from "../../../forms/button-submit/button-submit.component";

const AddClientModalEmail = () => {
    const {step, setStep, form, update} = useContext(ClientFormContext);
    const {t} = useTranslation();
    const handleSubmit = (values: ClientFormType, helper: FormikHelpers<ClientFormType>) => {
        helper.setSubmitting(false);
        setStep(Math.random() > .5 ? clientFormSteps.MESSAGE : clientFormSteps.FORM);
    };
    return (
        <Styles>
            <Formik initialValues={form}
                    onSubmit={handleSubmit}
                    validationSchema={Yup.object({
                        email: Yup.string().required().email()
                    })}
            >
                <Form>
                    <FormInputLabeled name={'email'} label={t('profile:email')} onUpdate={update}/>
                    <ButtonSubmit>{t('next')}</ButtonSubmit>
                </Form>
            </Formik>
        </Styles>
    );
};

export default AddClientModalEmail;
