import React, {useState, useEffect} from 'react';
import Styles from './add-session-fields-desktop.styles';
import PageSubtitle from "../../../../../components/titles/page-subtitle.styles";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import FormDatepicker from "../../../../../components/forms/form-datepicker/form-datepicker.component";
import FormTimepicker from "../../../../../components/forms/form-timepicker/form-timepicker.component";
import FormInputLabeled from "../../../../../components/forms/form-input-labeled/form-input-labeled.component";
import FormSelect from "../../../../../components/forms/form-select/form-select.component";
import {serviceTypeOptions} from "../../../../../enums/service-type.enum";
import FormTextarea from "../../../../../components/forms/form-textarea/form-textarea.component";
import ButtonSubmit from "../../../../../components/forms/button-submit/button-submit.component";
import AddSessionForm from "../add-session-form/add-session-form.component";
import moment from 'moment';

type Props = {};
const AddSessionFieldsDesktop = ({}: Props) => {
    const {t} = useTranslation();
    return (
        <Styles>
            <PageSubtitle>{t('sessions:schedule-for')}</PageSubtitle>
            <AddSessionForm>
            <div className={'add-session__form'}>
                <div className={'add-session__form__left'}>
                    <FormDatepicker name={'date'} label={t('sessions:date')}
                    disabledDate={(date) => moment(date).isBefore(moment(), 'days')}/>
                    <FormTimepicker name={'time'} label={t('sessions:time')}/>
                    <FormInputLabeled name={'duration'} label={t('sessions:duration')}/>
                    <FormSelect name={'type'} label={t('sessions:type')} options={serviceTypeOptions}/>
                </div>
                <div className={'add-session__form__right'}>
                    <FormTextarea name={'notes'} label={t('sessions:notes')}/>
                    <div className={'add-session__form__credits'}>
                        <span>{t('sessions:remind-credits')}:</span>
                        <span>&nbsp;3</span>
                    </div>
                </div>
            </div>
            <ButtonSubmit className={'add-session__form__submit'}>{t('sessions:submit')}</ButtonSubmit>
            </AddSessionForm>
        </Styles>
    );
};

export default AddSessionFieldsDesktop;
