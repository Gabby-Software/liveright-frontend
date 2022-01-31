import moment, { Moment } from 'moment'
import React, { useMemo, useState } from 'react'
import { useHistory, useParams } from 'react-router'

import Checkbox from '../../../../../components/form/checkbox/checkbox.component'
import Label from '../../../../../components/form/label/label.component'
import RadioGroup from '../../../../../components/form/radio-group/radio-group.component'
import Select from '../../../../../components/form/select/select.component'
import { Routes } from '../../../../../enums/routes.enum'
import useDietPlan from '../../../../../hooks/api/activities/useDietPlan'
import useDietPlans from '../../../../../hooks/api/activities/useDietPlans'
import useTemplateMealPlan from '../../../../../hooks/api/templates/useTemplateMealPlan'
import { DATE_PRETTY_FORMAT } from '../../../../../utils/date'
import { setItemInLocalStorage } from '../../../../../utils/localStorage'
import { getRoute } from '../../../../../utils/routes'
import WorkoutTemplateDialog from '../../../components/dialog/workout-template-dialog/workout-template-dialog.component'

interface IProps {
  open: boolean
  onClose: () => void
}

const MealPlanUseTemplateDialog = ({ open, onClose }: IProps) => {
  const params = useParams<any>()
  const history = useHistory()
  const [applyOption, setApplyOption] = useState('existing')
  const [client, setClient] = useState<{ id: string; name: string }>({
    id: '',
    name: ''
  })
  const [date, setDate] = useState('')
  const [selectedDP, setSelectedDP] = useState('')
  const [days, setDays] = useState<number[]>([])

  const { mealPlan } = useTemplateMealPlan({ id: params.id })
  const { dietPlans } = useDietPlans({ clientId: client.id })
  const { dietPlan, revision } = useDietPlan({
    clientId: client.id,
    id: selectedDP,
    revisionId: 'current'
  })

  const dpOptions = useMemo(() => {
    return dietPlans.map((dp: any) => ({
      label: dp.name,
      value: dp._id
    }))
  }, [dietPlans])

  const getAlertMessage = () => {
    let msg =
      applyOption === 'new'
        ? `This will make a new training plan for ${client.name} and add the selected meal plan to it. 
        You can make changes to the order and details after confirming below.`
        : dietPlan.name
        ? `This will make changes to ${client.name}’s “${
            dietPlan.name
          }” diet plan, which is currently ${
            dietPlan.status
          } and will add this meal plan to ${days
            .map((v) => `Day ${v + 1}`)
            .join(
              ', '
            )} overwriting the current choice. You can make changes to the order and details after confirming below.`
        : ''

    if (date) {
      msg += ` This will take effect from ${moment(date).format(
        DATE_PRETTY_FORMAT
      )}.`
    }

    return msg
  }

  const onDayCheckboxChange = (checked: boolean, value: number) => {
    if (checked) {
      setDays((prev) => [...prev, value])
    } else {
      setDays((prev) => prev.filter((v) => v !== value))
    }
  }

  const onConfirm = () => {
    let dPdays: any[] = []

    if (applyOption !== 'new') {
      dPdays = revision.days
      days.forEach((v) => {
        if (dPdays?.[v]) {
          dPdays[v] = {
            name: mealPlan.name,
            activities: mealPlan.activities,
            total_target: mealPlan.total_target
          }
        }
      })
    } else {
      dPdays.push({
        name: mealPlan.name,
        activities: mealPlan.activities,
        total_target: mealPlan.total_target
      })
    }

    setItemInLocalStorage('days', JSON.stringify(dPdays))

    const qs = new URLSearchParams()
    qs.set(applyOption === 'new' ? 'create' : 'edit', '1')
    qs.set('loadDaysFromls', 'days')
    qs.set('scheduled_start_on', date)

    const baseUrl =
      applyOption === 'new'
        ? getRoute(Routes.ACTIVITIES_DP, { clientId: client.id })
        : getRoute(Routes.ACTIVITIES_DP_ID, {
            clientId: client.id,
            id: dietPlan._id,
            revisionId: revision._id
          })

    history.push(`${baseUrl}?${qs.toString()}`)
  }

  return (
    <WorkoutTemplateDialog
      name="Use meal plan template"
      title={mealPlan.name}
      description="You’re about to use the following meal plan template"
      onClient={(value, option) => setClient({ id: value, name: option.label })}
      body={
        <div style={{ marginBottom: '1.5rem' }}>
          <div className="options-todo">
            <p>What do you wish to do?</p>
            <RadioGroup
              align="vertical"
              options={[
                {
                  label: 'Add to existing diet plan day',
                  value: 'existing',
                  disabled: false
                },
                {
                  label: 'Create new diet plan day from this meal plan',
                  value: 'new',
                  disabled: false
                }
              ]}
              value={applyOption}
              onChange={(e) => setApplyOption(e.target.value)}
            />
          </div>
          {applyOption === 'existing' && (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '1.5rem'
                }}
              >
                <div style={{ width: '45%' }}>
                  <p>Select diet plan</p>
                  <Select
                    id="diet-plan-select"
                    options={dpOptions}
                    value={selectedDP}
                    onChange={(value) => setSelectedDP(value)}
                  />
                </div>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  gap: 8,
                  margin: '1rem 0',
                  padding: '12px 16px',
                  borderRadius: 8,
                  backgroundColor: '#EDEDED'
                }}
              >
                {Array(revision?.days_count || 0)
                  .fill(1)
                  .map((v, i) => (
                    <div
                      style={{ display: 'inline-flex', marginRight: 16 }}
                      key={i}
                    >
                      <Checkbox
                        style={{ lineHeight: 1 }}
                        value={days.includes(i)}
                        onChange={(e) =>
                          onDayCheckboxChange(e.target.checked, i)
                        }
                      />
                      <Label style={{ margin: '0 8px', lineHeight: 1 }}>
                        Day {i + 1}
                      </Label>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      }
      date={{
        label: 'From when should we apply this change',
        value: date,
        disabledDate: (date: Moment) => date.isBefore(),
        onChange: (date: any) =>
          setDate(date ? new Date(date).toISOString() : '')
      }}
      alert={getAlertMessage()}
      yes="Confirm Changes"
      cancel="Nevermind"
      open={open}
      onClose={onClose}
      onCancel={onClose}
      onYes={onConfirm}
    />
  )
}

export default MealPlanUseTemplateDialog
