import usePaymentAccount from '../../hooks/api/payments/usePaymentAccount'
import { Styles } from './payment-badge.styles'

export default function PaymentBadge() {
  const {
    account,
    onCreateAccount,
    isCreateAccountLoading,
    isCreateLinkLoading
  } = usePaymentAccount()
  // const isActive = !!account.id
  const isCompleted = account.details_submitted
  return (
    <Styles
      $active={isCompleted}
      className="financials__payment-btn"
      // onClick={() => (isActive ? onCreateAccount() : onCreateLink())}
      onClick={() => onCreateAccount()}
      disabled={isCreateAccountLoading || isCreateLinkLoading}
    >
      S
    </Styles>
  )
}
