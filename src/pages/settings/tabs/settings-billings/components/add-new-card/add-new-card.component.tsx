import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

import { InfoIcon } from '../../../../../../assets/media/icons'
import Button from '../../../../../../components/buttons/button/button.component'
import Drawer from '../../../../../../components/drawer/drawer.component'
import DatePicker from '../../../../../../components/form/date-picker/date-picker.component'
import Input from '../../../../../../components/form/input/input.component'
import { useTranslation } from '../../../../../../modules/i18n/i18n.hook'
import Styles from './add-new-card.styles'

interface IProps {
  isOpen: boolean
  onClose: () => void
}

const formValidations = Yup.object({
  cardNumber: Yup.string()
    .max(16, 'The number should be 16 digits long')
    .min(16, 'The number should be 16 digits long')
    .required(),
  nameOnCard: Yup.string().required(),
  expiryDate: Yup.string().required(),
  cvv: Yup.string()
    .max(3, 'The number should be 3 digits long')
    .min(3, 'The number should be 3 digits long')
    .required()
})

const AddNewCard = ({ isOpen, onClose }: IProps) => {
  const { t } = useTranslation()
  const { values, errors, isValid, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      cardNumber: '',
      nameOnCard: '',
      expiryDate: '',
      cvv: ''
    },
    validationSchema: formValidations,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values)
      alert(JSON.stringify(values, null, 2))
    }
  })
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      title={t('settings:billings.add-method')}
      width="40%"
    >
      <Styles>
        <h3>{t('settings:billings.provide-card-details')}</h3>
        <br />
        <form className="form" onSubmit={handleSubmit}>
          <Input
            id="card-number"
            label="Card Number"
            placeholder="XXXX XXXX XXXX XXXX"
            value={values.cardNumber
              .replace(/[^\dA-Z]/g, '')
              .replace(/(.{4})/g, '$1 ')
              .trim()}
            onChange={(e) =>
              setFieldValue('cardNumber', e.target.value.replace(/ /g, ''))
            }
            error={errors.cardNumber}
            className="field"
          />
          <Input
            id="name-on-card"
            label="Name on Card"
            placeholder="e.g John Doe"
            value={values.nameOnCard}
            onChange={(e) => setFieldValue('nameOnCard', e.target.value)}
            error={errors.nameOnCard}
            className="field"
          />
          <div>
            <DatePicker
              id="expiry-date"
              label="Expiry"
              placeholder="MM/YY"
              format={'MM-YY'}
              picker="month"
              value={values.expiryDate}
              onChange={(e, dateStr) => setFieldValue('expiryDate', dateStr)}
              error={errors.expiryDate}
              className="field half-input"
            />
            <Input
              id="cvv"
              label="CVV"
              labelComponent={<InfoIcon />}
              placeholder="XXX"
              value={values.cvv}
              onChange={(e) => setFieldValue('cvv', e.target.value)}
              error={errors.cvv}
              className="field half-input"
            />
          </div>
          <Button htmlType="submit" className="save" disabled={!isValid}>
            Save
          </Button>
        </form>
      </Styles>
    </Drawer>
  )
}

export default AddNewCard
