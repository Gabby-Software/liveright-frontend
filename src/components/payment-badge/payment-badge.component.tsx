import usePaymentAccount from '../../hooks/api/payments/usePaymentAccount'
import { Styles } from './payment-badge.styles'

export default function PaymentBadge() {
  const {
    account,
    onCreateAccount,
    isCreateAccountLoading,
    isCreateLinkLoading,
    onCreateLink
  } = usePaymentAccount()
  const isActive = !!account.id
  const isCompleted = account.details_submitted
  return (
    <Styles
      $active={isCompleted}
      className="financials__payment-btn"
      onClick={() => (isActive ? onCreateLink() : onCreateAccount())}
      // onClick={() => onCreateAccount()}
      disabled={isCreateAccountLoading || isCreateLinkLoading}
    >
      S
    </Styles>
  )
}
