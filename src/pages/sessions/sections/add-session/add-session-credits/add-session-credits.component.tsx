import React, {useState, useEffect} from 'react';
import Styles from './add-session-credits.styles';
import {Field, FieldProps} from "formik";
import {serviceTypes} from "../../../../../enums/service-type.enum";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";

type Props = {};
const AddSessionCredits = ({}:Props) => {
    const {t} = useTranslation();
    return (
        <Field name={'sessions'}>
            {({field, form}: FieldProps) => (
                <div className={'add-session__form__credits'}>
                    <span>{t('sessions:remind-credits')}:</span>
                    <span>&nbsp;{form.values.type === serviceTypes.PT_SESSION?field.value-1:field.value}</span>
                </div>
            )}
        </Field>
    )
};

export default AddSessionCredits;
