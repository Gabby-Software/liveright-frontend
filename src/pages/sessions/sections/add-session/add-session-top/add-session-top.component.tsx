import React from 'react';
import Styles from './add-session-top.styles';
import PageSubtitle from "../../../../../components/titles/page-subtitle.styles";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import {ReactComponent as CalendarIcon} from "../../../../../assets/media/icons/calendar.svg";
import {ReactComponent as ClockIcon} from "../../../../../assets/media/icons/clock.svg";
import {Field, FieldProps, useFormikContext} from "formik";
import FormSelect from "../../../../../components/forms/form-select/form-select.component";
import {useClients} from "../../../../../hooks/clients.hook";
import {AddSessionFormType} from "../add-session-form/add-session-form.component";
import SessionUserAvatar from "../../../components/session-user-avatar/session-user-avatar.component";
import {SessionType} from "../../../../../types/session.type";
import moment from "moment";

interface Props {
    session?: SessionType;
}

const AddSessionTop: React.FC<Props> = (props) => {
    const {session} = props;
    const {t} = useTranslation();
    const clients = useClients();
    const {values} = useFormikContext<AddSessionFormType>()
    const selectedClient = clients.data.data.find((it) => it.id === +values?.client_id);

    return (
        <Styles>
            <PageSubtitle>{t('sessions:schedule-session')}</PageSubtitle>
            {!session && (
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
                <SessionUserAvatar last_name={selectedClient.last_name} first_name={selectedClient.first_name} />
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
            {session && session.starts_at ? (
                <div className={'session-top__requested'}>
                    <div className={'session-top__requested__label'}>
                        {session ? t('sessions:current-time') : t('sessions:requested')}
                    </div>
                    <div className={'session-top__requested__dates'}>
                        <div className={'session-top__requested__date'}>
                            <CalendarIcon/>
                            <span>{moment(session?.starts_at).format('YYYY-MM-DD')}</span>
                        </div>
                        <div className={'session-top__requested__date'}>
                            <ClockIcon/>
                            <span>{moment.utc(session?.starts_at).format('HH:mm')}</span>
                        </div>
                    </div>
                </div>
            ) : null}
        </Styles>
    )
};

export default AddSessionTop;
