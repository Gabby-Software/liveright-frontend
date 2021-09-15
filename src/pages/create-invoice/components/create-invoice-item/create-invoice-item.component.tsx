import { ArrayHelpers, FormikProps } from 'formik'
import moment from 'moment'
import React from 'react'

import { DeleteOutlinedIcon } from '../../../../assets/media/icons'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import Checkbox from '../../../../components/form/checkbox/checkbox.component'
import DatePicker from '../../../../components/form/date-picker/date-picker.component'
import Input from '../../../../components/form/input/input.component'
import Select from '../../../../components/form/select/select.component'
import formatter from '../../../../managers/formatter.manager'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { asMoney } from '../../../../pipes/as-money.pipe'
import { asPrice } from '../../../../pipes/price.pipe'
import { OptionType } from '../../../../types/option.type'
import { InvoiceFormType, InvoiceItemType } from '../../create-invoice.data'
import Styles from './create-invoice-item.styles'

type Props = {
  form: FormikProps<InvoiceFormType>
  helper: ArrayHelpers
  item: InvoiceItemType
  i: number
  credits: number
}

const typeOptions: OptionType[] = [
  { label: 'PT session', value: 'PT session' },
  { label: 'Coaching session', value: 'Coaching session' },
  { label: 'Consultation', value: 'Consultation' }
]

const CreateInvoiceItem = ({ form, helper, i, item, credits }: Props) => {
  const { t } = useTranslation()
  return (
    <Styles>
      <div className="ci-item__row">
        <Select
          name={`items.${i}.type`}
          id={`add-item-type-${i}`}
          options={typeOptions}
          label={t('invoices:create.type')}
          value={item.type}
          onChange={(e) => form.setFieldValue(`items.${i}.type`, e)}
        />

        <Input
          id={`add-item-desc-${i}`}
          name={`items.${i}.name`}
          label={t('invoices:create.description')}
          value={item.description}
          onChange={(e) =>
            form.setFieldValue(`items.${i}.description`, e.target.value)
          }
        />

        {item.type === 'PT session' && (
          <DatePicker
            id={`add-item-expires-${i}`}
            label={t('invoices:expires-on')}
            name={`items.${i}.extras.session_expires_on`}
            disabledDate={(date) => date.isBefore(moment().startOf('day'))}
            value={item.extras.session_expires_on}
            onChange={(e, date) =>
              form.setFieldValue(`items.${i}.extras.session_expires_on`, date)
            }
          />
        )}
      </div>

      <div className="ci-item__row">
        <Input
          id={`add-item-tax-${i}`}
          format={formatter().number().min(0).max(100)}
          name={`items.${i}.tax_rate`}
          label={t('invoices:is-taxed')}
          labelComponent={
            <Checkbox
              checked={item.is_taxable}
              onChange={(e) =>
                form.setFieldValue(`items.${i}.is_taxable`, e.target.checked)
              }
            />
          }
          value={item.tax_rate}
          onChange={(e) =>
            form.setFieldValue(`items.${i}.tax_rate`, e.target.value)
          }
          disabled={!item.is_taxable}
        />

        <div className="ci-item__sub-row">
          <Input
            id={`add-item-quantity-${i}`}
            format={formatter().number().min(1)}
            name={`items.${i}.quantity`}
            label={t('invoices:create.quantity')}
            value={item.quantity}
            onChange={(e) =>
              form.setFieldValue(`items.${i}.quantity`, e.target.value)
            }
          />
          <Input
            id={`add-item-price-${i}`}
            format={formatter().number().min(0)}
            name={`items.${i}.unit_price`}
            label={t('invoices:create.price')}
            value={item.unit_price}
            onChange={(e) =>
              form.setFieldValue(`items.${i}.unit_price`, e.target.value)
            }
          />

          <Input
            id={`add-item-discount-${i}`}
            format={formatter().number().min(0).max(100)}
            name={`items.${i}.discount_percent`}
            label={t('invoices:create.discount')}
            value={item.discount_percent}
            onChange={(e) =>
              form.setFieldValue(`items.${i}.discount_percent`, e.target.value)
            }
          />

          <Input
            id={`add-item-total-${i}`}
            name={`items.${i}.total`}
            label={t('invoices:items-total')}
            value={
              asMoney(
                asPrice(
                  +item.unit_price *
                    item.quantity *
                    (1 - (item.discount_percent || 0) / 100) *
                    (1 + (item.is_taxable ? item.tax_rate || 0 : 0) / 100)
                )
              ) + ' AED'
            }
            readOnly
          />
        </div>
      </div>

      <div className="flex justify-between align-center">
        {item.type === 'PT session' && (
          <p className="ci-item__credits">
            {t('invoices:total-after-invoice')}
            <span> {credits}</span>
          </p>
        )}

        {form.values.items.length > 1 && (
          <IconButton
            className="ci-item__remove"
            onClick={() => helper.remove(i)}
          >
            <DeleteOutlinedIcon />
          </IconButton>
        )}
      </div>
    </Styles>
  )
}

export default CreateInvoiceItem
