import moment from 'moment'
import React, { FC } from 'react'

import DatePicker from '../../../../../components/form/date-picker/date-picker.component'
import Input from '../../../../../components/form/input/input.component'
import Select from '../../../../../components/form/select/select.component'
import formatter from '../../../../../managers/formatter.manager'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { asMoney } from '../../../../../pipes/as-money.pipe'
import { asPrice } from '../../../../../pipes/price.pipe'
import { OptionType } from '../../../../../types/option.type'
import { InvoiceItemType } from '../../../create-invoice.data'
import Styles from './create-invoice-mobile-item-form.styles'

const typeOptions: OptionType[] = [
  { label: 'PT session', value: 'PT session' },
  { label: 'Coaching session', value: 'Coaching session' }
]

interface CreateInvoiceMobileItemFormProps {
  onChange: any
}

const CreateInvoiceMobileItemForm: FC<
  CreateInvoiceMobileItemFormProps & InvoiceItemType
> = ({
  type,
  quantity,
  unit_price,
  is_taxable,
  tax_rate,
  discount_percent,
  onChange,
  name,
  extras
}) => {
  const { t } = useTranslation()
  return (
    <Styles>
      <Select
        id="create-invoice-type"
        name={`type`}
        label={t('invoices:create.type')}
        className="add-invoice__form-item"
        options={typeOptions}
        value={type}
        onChange={(e) => onChange('type', e)}
      />
      <Input
        id="create-invoice-desc"
        name={`name`}
        className="add-invoice__form-item"
        label={t('invoices:create.description')}
        value={name}
        onChange={(e) => onChange('name', e.target.value)}
        max={300}
      />
      {type === 'PT session' && (
        <DatePicker
          id="create-invoice-expire"
          className="add-invoice__form-item"
          label={'Session Expire on'}
          name={`extras.session_expires_on`}
          disabledDate={(date) => date.isBefore(moment().startOf('day'))}
          value={extras.session_expires_on}
          onChange={(e, date) => onChange('extras.session_expires_on', date)}
        />
      )}
      <div className={'ci-item__grid'}>
        <Input
          id="create-invoice-price"
          format={formatter().number().min(0)}
          name={`unit_price`}
          label={t('invoices:create.price')}
          value={unit_price}
          onChange={(e) => onChange('unit_price', e.target.value)}
        />
        {/*<FormCheckbox name={`is_taxable`} label={'Is Taxed?'} />*/}
        <Input
          id="create-invoice-quantity"
          format={formatter().number().min(1)}
          name={`quantity`}
          label={t('invoices:create.quantity')}
          value={quantity}
          onChange={(e) => onChange('quantity', e.target.value)}
        />
        <Input
          id="create-invoice-tax"
          format={formatter().number().min(0).max(100)}
          name={`tax_rate`}
          label={t('invoices:vat-percentage')}
          suffix={'%'}
          value={tax_rate}
          onChange={(e) => onChange('tax_rate', e.target.value)}
        />

        <Input
          id="create-invoice-discount"
          format={formatter().number().min(0).max(100)}
          name={`discount_percent`}
          label={t('invoices:create.discount')}
          suffix={'%'}
          value={discount_percent}
          onChange={(e) => onChange('discount_percent', e.target.value)}
        />
      </div>

      <Input
        readOnly
        id="create-invoice-subtotal"
        className="add-invoice__form-item"
        label={t('invoices:subtotal')}
        value={
          asMoney(
            asPrice(
              +unit_price *
                quantity *
                (1 - (discount_percent || 0) / 100) *
                (1 + (is_taxable ? tax_rate || 0 : 0) / 100)
            )
          ) + ' AED'
        }
      />
    </Styles>
  )
}

export default CreateInvoiceMobileItemForm
