import moment from 'moment'
import React from 'react'

import MasterCardImg from '../../../../../../assets/media/mastercard.png'
import VisaCardImg from '../../../../../../assets/media/visa.png'
import { useTranslation } from '../../../../../../modules/i18n/i18n.hook'
import { formatCreditCard } from '../../../../../../pipes/payments.pipe'
import Styles from './billing-card.styles'

interface IProps {
  active?: boolean
  cardNo: string
  cardHolder: string
  expiryDate: string
  onClick: () => void
}

const BillingCard = ({
  active,
  cardNo,
  cardHolder,
  expiryDate,
  onClick
}: IProps) => {
  const { t } = useTranslation()
  const card = cardNo.startsWith('4') ? 'Visa Card' : 'Master Card'
  return (
    <Styles active={!!active} onClick={onClick}>
      {active && (
        <div className="radio">
          <div className="radio__checked"></div>
        </div>
      )}
      <div className="content">
        <div className="content__title">
          <h4>{card}</h4>
          <img
            src={card.includes('Visa') ? VisaCardImg : MasterCardImg}
            alt={card}
          />
        </div>
        <div className="content__card_no">{formatCreditCard(cardNo)}</div>
        <div className="content__details">
          <div className="content__details__item">
            <p className="item_heading">{t('settings:billings.card-holder')}</p>
            <p className="item_info">{cardHolder}</p>
          </div>
          <div className="content__details__item">
            <p className="item_heading">{t('settings:billings.expiry-date')}</p>
            <p className="item_info">{moment(expiryDate).format('MM-DD')}</p>
          </div>
        </div>
      </div>
    </Styles>
  )
}

export default BillingCard
