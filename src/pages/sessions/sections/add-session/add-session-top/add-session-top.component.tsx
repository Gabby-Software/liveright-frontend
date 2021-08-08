import React from 'react';
import Styles from './add-session-top.styles';
import PageSubtitle from "../../../../../components/titles/page-subtitle.styles";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import profilePlaceholder from "../../../../../assets/media/profile-placeholder.png";
import {ReactComponent as CalendarIcon} from "../../../../../assets/media/icons/calendar.svg";
import {ReactComponent as ClockIcon} from "../../../../../assets/media/icons/clock.svg";
import {Field, FieldProps, useFormikContext} from "formik";
import FormSelect from "../../../../../components/forms/form-select/form-select.component";
import {useClients} from "../../../../../hooks/clients.hook";
import {AddSessionFormType} from "../add-session-form/add-session-form.component";

type Props = {forEdit?: boolean};
const AddSessionTop = ({forEdit}: Props) => {
    const {t} = useTranslation();
    const clients = useClients();
    const {values} = useFormikContext<AddSessionFormType>()
    const selectedClient = clients.data.data.find((it) => it.id === +values?.client_id);

    return (
        <Styles>
            <PageSubtitle>{t('sessions:schedule-session')}</PageSubtitle>
          {!forEdit && (
              <FormSelect
                  name="client_id"
                  label="Please select a client to schedule for..."
                  options={
                    clients.data.data.map(({first_name, last_name, id}) => {
                      return ({label: `${first_name} ${last_name}`, value: id.toString()})
                    })
                  }
              />
          )}
          {selectedClient ? (
              <div className={'session-top__head'}>
                <div className={'session-top__client'}>
                  <img alt={'client'} src={profilePlaceholder} className={'session-top__image'}/>
                  <div className={'session-top__name'}>{selectedClient.first_name} {selectedClient.last_name}</div>
                </div>
                <Field name={'sessions'}>
                  {({field}: FieldProps) => (
                      <div className={'session-top__credits'}>
                        <span>{t('sessions:current-credits')}:</span>
                        <span>&nbsp;{field.value}</span>
                      </div>
                  )}
                </Field>
              </div>
          ) : null}
            <div className={'session-top__requested'}>
                <div className={'session-top__requested__label'}>{forEdit?t('sessions:current-time'):t('sessions:requested')}</div>
                <div className={'session-top__requested__dates'}>
                <div className={'session-top__requested__date'}>
                    <CalendarIcon/>
                    <span>2021-03-04</span>
                </div>
                <div className={'session-top__requested__date'}>
                    <ClockIcon/>
                    <span>12:30</span>
                </div>
                </div>
            </div>
        </Styles>
    )
};

export default AddSessionTop;
