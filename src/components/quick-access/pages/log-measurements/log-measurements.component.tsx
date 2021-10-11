import moment from 'moment'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import useMeasurements from '../../../../hooks/api/progress/useMeasurements'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { kgToLb, lbToKg } from '../../../../utils/body'
import { DATE_FORMAT } from '../../../../utils/date'
import Button from '../../../buttons/button/button.component'
import Card from '../../../cards/card/card.component'
import Input from '../../../form/input/input.component'
import QuickAccessBack from '../../components/quick-access-back/quick-access-back.component'
import QuickAccessTitle from '../../components/quick-access-title/quick-access-title.component'
import { useQuickAccess } from '../../quick-access.context'
import { quickAccessRoutes } from '../../quick-access.routes'
import { Styles } from './log-measurements.styles'

export default function LogMeasurements() {
  const { t } = useTranslation()
  const { client, setOpen } = useQuickAccess()

  const methods = useForm()

  const { measurements, onAdd } = useMeasurements({
    filter: {
      date: moment().format(DATE_FORMAT),
      account_id: client?.id ? `${client.id}` : undefined
    },
    per_page: 1
  })

  const data = measurements[0]

  useEffect(() => {
    if (data?.id) {
      methods.setValue('weight_kgs', data.weight_kgs)
      methods.setValue('weight_lbs', data.weight_lbs)
    }
  }, [data?.id])

  const handleSave = (values: any) => {
    onAdd(values, data?.id, () => {
      setOpen(false)
    })
  }

  return (
    <Styles>
      <QuickAccessBack label={'log'} route={quickAccessRoutes.LOG} />
      <QuickAccessTitle label={'Today'}>
        {t('quickaccess:menu.measurement-title')}
      </QuickAccessTitle>

      <Card className="log-measurements__card">
        <p className="log-measurements__title">Body Weight</p>

        <div className="log-measurements__row">
          <Controller
            control={methods.control}
            render={({ field: { name, value } }) => (
              <Input
                id="log-measurements-kg"
                label="KGs"
                className="log-measurements__input"
                value={value}
                onChange={(e) => {
                  const value = Number(e.target.value)
                  methods.setValue(name, value)
                  methods.setValue('weight_lbs', kgToLb(value))
                }}
              />
            )}
            name="weight_kgs"
          />
          <span>=</span>
          <Controller
            control={methods.control}
            render={({ field: { name, value } }) => (
              <Input
                id="log-measurements-lb"
                label="LBs"
                className="log-measurements__input"
                value={value}
                onChange={(e) => {
                  const value = Number(e.target.value)
                  methods.setValue(name, value)
                  methods.setValue('weight_kgs', lbToKg(value))
                }}
              />
            )}
            name="weight_lbs"
          />
        </div>
      </Card>

      <Button
        className="log-measurements__submit"
        onClick={() => methods.handleSubmit(handleSave)()}
      >
        Done & Save
      </Button>
    </Styles>
  )
}
