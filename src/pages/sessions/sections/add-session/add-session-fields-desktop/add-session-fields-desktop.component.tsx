import React, {useState, useEffect} from 'react';
import Styles from './add-session-fields-desktop.styles';
import PageSubtitle from "../../../../../components/titles/page-subtitle.styles";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import FormDatepicker from "../../../../../components/forms/form-datepicker/form-datepicker.component";
import FormTimepicker from "../../../../../components/forms/form-timepicker/form-timepicker.component";
import FormInputLabeled from "../../../../../components/forms/form-input-labeled/form-input-labeled.component";
import FormSelect from "../../../../../components/forms/form-select/form-select.component";
import {serviceTypeOptions, serviceTypes} from "../../../../../enums/service-type.enum";
import FormTextarea from "../../../../../components/forms/form-textarea/form-textarea.component";
import ButtonSubmit from "../../../../../components/forms/button-submit/button-submit.component";
import AddSessionForm from "../add-session-form/add-session-form.component";
import moment from 'moment';
import AddSessionSubmit from "../add-session-submit/add-session-submit.component";
import {Field, FieldProps} from "formik";
import AddSessionCredits from "../add-session-credits/add-session-credits.component";
import AddSessionDelete from "../add-session-delete/add-session-delete.component";

type Props = { forEdit?: boolean };
const AddSessionFieldsDesktop = ({forEdit}: Props) => {
    const {t} = useTranslation();
    return (
        <Styles>
            <PageSubtitle>{t('sessions:schedule-for')}</PageSubtitle>
            <div className={'add-session__form'}>
                <div className={'add-session__form__left'}>
                    <FormDatepicker name={'date'} label={t('sessions:date')}
                                    disabledDate={(date) => moment(date).isBefore(moment(), 'days')}/>
                    <FormTimepicker name={'time'} label={t('sessions:time')}/>
                    <FormInputLabeled name={'duration'} label={t('sessions:duration')}
                                      disabled={forEdit}/>
                    <FormSelect name={'type'} label={t('sessions:type')} options={serviceTypeOptions}
                                disabled={forEdit}/>
                    <AddSessionDelete forEdit={forEdit}/>
                </div>
                <div className={'add-session__form__right'}>
                    <FormTextarea name={'notes'} label={t('sessions:notes')}/>
                    {
                        forEdit ? null : (
                            <AddSessionCredits/>
                        )
                    }
                </div>
            </div>
            <AddSessionSubmit forEdit={forEdit}/>
        </Styles>
    );
};

export default AddSessionFieldsDesktop;
