import React from 'react'

import Button from '../../../../../../components/buttons/button/button.component'
import TotalInfoCard from '../total-info-card/total-info-card.component'
import UserDetailsCard from '../user-details-card/user-details-card.component'
import Styles from './info-cards.styles'

const InfoCards = () => {
  const user = {
    avatar: {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&usqp=CAU',
      firstName: 'Dafy',
      lastName: 'Duck'
    },
    joinedAt: new Date().toISOString(),
    stripeAccountLink: 'https://wwww.stripe.com'
  }

  return (
    <Styles className="info_cards">
      <UserDetailsCard {...user} />
      <TotalInfoCard
        label="Total Recieved"
        value={'5500'}
        note={'(3 Invoices)'}
      />
      <TotalInfoCard
        label="Available Payout"
        value={'2500'}
        note={'(30 Invoices)'}
      />
      <div className="info_cards__payouts">
        <Button>Payout Now</Button>
        <a href={user.stripeAccountLink}>View Payouts on Stripe</a>
      </div>
    </Styles>
  )
}

export default InfoCards
