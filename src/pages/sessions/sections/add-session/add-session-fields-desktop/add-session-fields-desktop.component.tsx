import React from 'react';
import Styles from './add-session-fields-desktop.styles';
import PageSubtitle from "../../../../../components/titles/page-subtitle.styles";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import FormDatepicker from "../../../../../components/forms/form-datepicker/form-datepicker.component";
import FormTimepicker from "../../../../../components/forms/form-timepicker/form-timepicker.component";
import FormSelect from "../../../../../components/forms/form-select/form-select.component";
import {serviceTypeOptions} from "../../../../../enums/service-type.enum";
import FormTextarea from "../../../../../components/forms/form-textarea/form-textarea.component";
import moment from 'moment';
import AddSessionSubmit from "../add-session-submit/add-session-submit.component";
import AddSessionCredits from "../add-session-credits/add-session-credits.component";
import AddSessionDelete from "../add-session-delete/add-session-delete.component";
import {SessionType} from "../../../../../types/session.type";

interface Props {
  session?: SessionType
  onClose?: () => void
}

const AddSessionFieldsDesktop: React.FC<Props> = (props) => {
    const {session, onClose} = props;
    const {t} = useTranslation();

    return (
        <Styles>
            <PageSubtitle>{t('sessions:schedule-for')}</PageSubtitle>
            <div className={'add-session__form'}>
                <div className={'add-session__form__left'}>
                    <FormDatepicker
                        name={'date'}
                        label={t('sessions:date')}
                        disabledDate={(date) => moment(date).isBefore(moment(), 'days')}
                    />
                    <FormTimepicker name={'time'} label={t('sessions:time')}/>
                    <FormTimepicker
                        disabled={!!session}
                        name={'duration'}
                        label={t('sessions:duration')}
                    />
                    <FormSelect
                        name={'type'}
                        label={t('sessions:type')}
                        options={serviceTypeOptions}
                        disabled={!!session}
                    />
                    {session ? <AddSessionDelete session_id={session.id} onClose={onClose} /> : null}
                </div>
                <div className={'add-session__form__right'}>
                    <FormTextarea name={'notes'} label={t('sessions:notes')}/>
                    {session ? null : <AddSessionCredits/>}
                </div>
            </div>
            <AddSessionSubmit session={session}/>
        </Styles>
    );
};

export default AddSessionFieldsDesktop;
