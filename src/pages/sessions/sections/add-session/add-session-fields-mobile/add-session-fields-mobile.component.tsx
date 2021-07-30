import React, {useState, useEffect} from 'react';
import Styles from './add-session-fields-mobile.styles';
import AddSessionForm from "../add-session-form/add-session-form.component";
import PageSubtitle from "../../../../../components/titles/page-subtitle.styles";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import moment from "moment";
import FormDatepicker from "../../../../../components/forms/form-datepicker/form-datepicker.component";
import FormTimepicker from "../../../../../components/forms/form-timepicker/form-timepicker.component";
import FormInputLabeled from "../../../../../components/forms/form-input-labeled/form-input-labeled.component";
import FormSelect from "../../../../../components/forms/form-select/form-select.component";
import {serviceTypeOptions, serviceTypes} from "../../../../../enums/service-type.enum";
import FormTextarea from "../../../../../components/forms/form-textarea/form-textarea.component";
import ButtonSubmit from "../../../../../components/forms/button-submit/button-submit.component";
import {ReactComponent as CalendarIcon} from "../../../../../assets/media/icons/calendar.svg";
import {ReactComponent as TimesIcon} from "../../../../../assets/media/icons/times.svg";
import AddSessionCalendar from "../add-session-calendar/add-session-calendar.component";
import AddSessionSubmit from "../add-session-submit/add-session-submit.component";
import {Field, FieldProps} from "formik";

type Props = {};
const AddSessionFieldsMobile = ({}: Props) => {
    const {t} = useTranslation();
    const [isShowCalendar, setIsShowCalendar] = useState<boolean>(false);
    return (
        <Styles>
                <div className={'add-session__form'}>
                    <PageSubtitle className={'add-session__for'}>{t('sessions:schedule-for')}</PageSubtitle>
                    <FormDatepicker name={'date'} label={t('sessions:date')}
                                    disabledDate={(date: any) => moment(date).isBefore(moment(), 'days')}/>
                    {
                        isShowCalendar ? (
                            <div className={'add-session__calendar__open'}>
                                <TimesIcon
                                    className={'add-session__calendar__times'}
                                    onClick={() => setIsShowCalendar(false)}/>
                                <AddSessionCalendar/>
                            </div>
                        ) : (
                            <div className={'add-session__calendar__close'}
                                 onClick={() => setIsShowCalendar(true)}>
                                <CalendarIcon/>
                                <span>{t('sessions:open-calendar')}</span>
                            </div>
                        )
                    }
                    <FormTimepicker name={'time'} label={t('sessions:time')}/>
                    <FormInputLabeled name={'duration'} label={t('sessions:duration')}/>
                    <FormSelect name={'type'} label={t('sessions:type')} options={serviceTypeOptions}/>
                    <FormTextarea name={'notes'} label={t('sessions:notes')}/>
                    <Field name={'sessions'}>
                        {({field, form}: FieldProps) => (
                            <div className={'add-session__form__credits'}>
                                <span>{t('sessions:remind-credits')}:</span>
                                <span>&nbsp;{form.values.type === serviceTypes.PT_SESSION?field.value-1:field.value}</span>
                            </div>
                        )}
                    </Field>
                    <AddSessionSubmit/>
                </div>
        </Styles>
    )
};

export default AddSessionFieldsMobile;
