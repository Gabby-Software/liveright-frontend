import React from 'react'

import { EditIcon } from '../../../../assets/media/icons'
import EditableLabel from '../../../../components/form/editableLabel/editableLabel.component'

export const renderTargetIncome = (
  revenue: string,
  type: string,
  targetIncome: number,
  projectedIncome: number,
  onUpdateGoals: (value: string, type: string) => void
) => (
  <EditableLabel
    label={Math.ceil(targetIncome).toString()}
    renderValue={
      <div>
        <span
          className={
            (revenue !== 'Total' &&
              (targetIncome > projectedIncome ? 'red' : 'green')) ||
            ''
          }
          style={{ marginRight: 5 }}
        >
          {Math.ceil(targetIncome)} AED
        </span>
        <EditIcon className="edit-icon" />
      </div>
    }
    onSave={(value: any) => {
      type && onUpdateGoals(value, type)
    }}
    renderCheckBtn
  />
)

export const getNewSalesNeeded = (
  targetIncome: number,
  projectedIncome: number,
  avgRate: number
) =>
  avgRate && targetIncome > projectedIncome
    ? Math.ceil((targetIncome - projectedIncome) / avgRate)
    : '-'
