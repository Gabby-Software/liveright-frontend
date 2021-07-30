import React, {useState, useEffect} from 'react';
import Styles from './add-session-credits.styles';
import {Field, FieldProps} from "formik";
import {serviceTypes} from "../../../../../enums/service-type.enum";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import {Routes} from "../../../../../enums/routes.enum";
import {Link} from "react-router-dom";
import FormButton from "../../../../../components/forms/form-button/form-button.component";

type Props = {};
const AddSessionCredits = ({}: Props) => {
    const {t} = useTranslation();
    return (
        <Field name={'sessions'}>
            {({field, form}: FieldProps) => (
                <Styles className={'add-session__form__credits'}>
                    <div>
                        <span>{t('sessions:remind-credits')}:</span>
                        <span>&nbsp;{form.values.type === serviceTypes.PT_SESSION ? field.value - 1 : field.value}</span>
                    </div>
                    {
                        form.values.type === serviceTypes.PT_SESSION && field.value <= 0 ? (
                            <Link to={Routes.INVOICES}>
                                <FormButton type={'default'}>Invoice Now</FormButton>
                            </Link>
                        ):null
                    }
                </Styles>
            )}
        </Field>
    )
};

export default AddSessionCredits;
