import React, { useState } from 'react'

import Button from '../../../../components/buttons/button/button.component'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import AddNewCard from './components/add-new-card/add-new-card.component'
import BillingCard from './components/billing-card-component/billing-card.component'
import Styles from './settings-billings.styles'

const dummyBillingMethods = [
  {
    id: 1,
    cardNo: '5242424242424242',
    cardHolder: 'John Doe',
    expiryDate: new Date().toString()
  },
  {
    id: 2,
    cardNo: '4242424242424242',
    cardHolder: 'John Doe',
    expiryDate: new Date().toString()
  }
]

const BillingsSettings = () => {
  const { t } = useTranslation()
  const [activeCard, setActiveCard] = useState(1)
  const [openAddDrawer, setOpenAddDrawer] = useState(false)
  return (
    <>
      <Styles className="billings">
        <div className="billings__title">
          <h2 className="billings__title__heading">
            {t('settings:billings.title')}
          </h2>
          <Button
            variant="text"
            className="billings__title__add-link"
            onClick={() => setOpenAddDrawer(true)}
          >
            {t('settings:billings.add-method')}
          </Button>
        </div>
        <div className="divider"></div>
        <div className="billings__cards">
          {dummyBillingMethods.map((b, i) => (
            <BillingCard
              key={i}
              active={activeCard === b.id}
              cardNo={b.cardNo}
              cardHolder={b.cardHolder}
              expiryDate={b.expiryDate}
              onClick={() => setActiveCard(b.id)}
            />
          ))}
        </div>
      </Styles>
      <AddNewCard
        isOpen={openAddDrawer}
        onClose={() => setOpenAddDrawer(false)}
      />
    </>
  )
}

export default BillingsSettings
