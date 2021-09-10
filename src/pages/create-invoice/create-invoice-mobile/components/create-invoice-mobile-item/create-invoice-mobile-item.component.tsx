import React, { FC } from 'react'

import { CaretRightIcon } from '../../../../../assets/media/icons'
import { asMoney } from '../../../../../pipes/as-money.pipe'
import { classes } from '../../../../../pipes/classes.pipe'
import { asPrice } from '../../../../../pipes/price.pipe'
import { InvoiceItemType } from '../../../create-invoice.data'
import Styles from './create-invoice-mobile-item.styles'

type Props = {
  item: InvoiceItemType
  active: boolean
  onClick: () => void
}
const CreateInvoiceMobileItem: FC<Props> = ({ item, active, onClick }) => {
  return (
    <Styles onClick={onClick} className={classes(active && 'ci-item__active')}>
      <div className={'ci-item'}>
        <div>
          <p className="ci-item__title">{item.name}</p>
          <p className={'ci-item__type'}>{item.type}</p>
        </div>

        <div className="ci-item__action">
          <div className="ci-item__cost">
            <p className="ci-item__title">Subtotal</p>
            <p className={'ci-item__total'}>
              {asMoney(
                asPrice(
                  +item.unit_price *
                    item.quantity *
                    (1 - (item.discount_percent || 0) / 100) *
                    (1 + (item.is_taxable ? item.tax_rate || 0 : 0) / 100)
                )
              ) + ' AED'}
            </p>
          </div>

          <CaretRightIcon />
        </div>
      </div>
    </Styles>
  )
}

export default CreateInvoiceMobileItem
