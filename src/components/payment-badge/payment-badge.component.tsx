import usePaymentAccount from '../../hooks/api/payments/usePaymentAccount'
import { Styles } from './payment-badge.styles'

export default function PaymentBadge() {
  const { account, onCreateAccount } = usePaymentAccount()
  return (
    <Styles
      $active={!!account.id}
      className="financials__payment-btn"
      onClick={onCreateAccount}
    >
      S
    </Styles>
  )
}
