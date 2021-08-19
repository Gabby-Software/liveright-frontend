import { useFormikContext } from 'formik'
import moment from 'moment'
import React from 'react'

import FormDatepicker from '../../../../../components/forms/form-datepicker/form-datepicker.component'
import FormSelect from '../../../../../components/forms/form-select/form-select.component'
import FormTextarea from '../../../../../components/forms/form-textarea/form-textarea.component'
import FormTimepicker from '../../../../../components/forms/form-timepicker/form-timepicker.component'
import PageSubtitle from '../../../../../components/titles/page-subtitle.styles'
import { serviceTypeOptions } from '../../../../../enums/service-type.enum'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { SessionType } from '../../../../../types/session.type'
import AddSessionCredits from '../add-session-credits/add-session-credits.component'
import AddSessionDelete from '../add-session-delete/add-session-delete.component'
import { AddSessionFormType } from '../add-session-form/add-session-form.component'
import AddSessionSubmit from '../add-session-submit/add-session-submit.component'
import Styles from './add-session-fields-desktop.styles'

interface Props {
  session?: SessionType
  onClose?: () => void
}

const AddSessionFieldsDesktop: React.FC<Props> = (props) => {
  const { session, onClose } = props
  const { t } = useTranslation()
  const { values } = useFormikContext<AddSessionFormType>()
  const isToday = moment(values.date).isSame(moment(), 'days')

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
          <FormTimepicker
            disabledUntilNow={isToday}
            name={'time'}
            label={t('sessions:time')}
          />
          <FormTimepicker
            disabled={!!session}
            name={'duration'}
            label={t('sessions:duration')}
            showNow={false}
          />
          <FormSelect
            name={'type'}
            label={t('sessions:type')}
            options={serviceTypeOptions}
            disabled={!!session}
          />
          {session ? (
            <AddSessionDelete session_id={session.id} onClose={onClose} />
          ) : null}
        </div>
        <div className={'add-session__form__right'}>
          <FormTextarea name={'notes'} label={t('sessions:notes')} />
          {session ? null : <AddSessionCredits />}
        </div>
      </div>
      <AddSessionSubmit session={session} />
    </Styles>
  )
}

export default AddSessionFieldsDesktop
