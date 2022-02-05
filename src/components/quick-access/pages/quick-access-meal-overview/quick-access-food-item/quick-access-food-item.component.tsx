import React, { FC, useState } from 'react'

import {
  CaretDownIcon,
  CaretLeftIcon,
  DeleteOutlinedIcon
} from '../../../../../assets/media/icons'
import formatter from '../../../../../managers/formatter.manager'
import Input from '../../../../form/input/input.component'
import Macronutrient from '../../../components/quick-access-macronutrient/quick-access-macronutrient.component'
import Styles from './quick-access-food-item.styles'

interface Props {
  name: string
  macronutrients: any
}

const QuickAccessFoodItem: FC<Props> = ({ name, macronutrients }) => {
  const [showMacronutreients, setShowMacronutrients] = useState(true)

  return (
    <Styles>
      <div className="qa-food-item__card">
        <div className="qa-food-item__card-header">
          <h2>{name}</h2>
          <span>
            <DeleteOutlinedIcon />
          </span>
        </div>

        <button
          onClick={() => setShowMacronutrients((prevState) => !prevState)}
        >
          {showMacronutreients ? (
            <>
              <span>Hide macronutrients</span>
              <CaretDownIcon />
            </>
          ) : (
            <>
              <span>Show macronutrients</span>
              <CaretLeftIcon style={{ margin: '-3px' }} />
            </>
          )}
        </button>

        {showMacronutreients && (
          <div className="qa-food-item__card-macronutrients">
            {Object.keys(macronutrients).map((k) => (
              <Macronutrient key={k} title={k} amount={'120g'} />
            ))}
          </div>
        )}

        <div className="qa-food-item__card-input-group">
          <Input
            id="qa-food-item-quantity"
            label="Quantity (gram)"
            format={formatter().number().max(10000)}
            max={6}
          />
          <Input
            id="qa-food-item-calories"
            label="Calories"
            readOnly
            disabled
            value={200}
          />
        </div>
      </div>
    </Styles>
  )
}

export default QuickAccessFoodItem
