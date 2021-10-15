import { Spin } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import {
  DeleteOutlinedIcon,
  ThreeDotsIcon
} from '../../../../../../assets/media/icons'
import StripeImage from '../../../../../../assets/media/Stripe.png'
import StripeSImage from '../../../../../../assets/media/Stripe-S.png'
import Button from '../../../../../../components/buttons/button/button.component'
import Dialog from '../../../../../../components/dialogs/dialog/dialog.component'
import {
  Dropdown,
  DropdownMenu,
  DropdownMenuItem
} from '../../../../../../components/dropdown'
import { toast } from '../../../../../../components/toast/toast.component'
import usePaymentAccount from '../../../../../../hooks/api/payments/usePaymentAccount'
import usePayoutBalance from '../../../../../../hooks/api/payments/usePayoutBalance'
import Styles from './stripe-connect.styles'

const StripeConnect = () => {
  const {
    account,
    onCreateAccount,
    onCreateLink,
    onCreateDashboardLink,
    onUnlinkStripeAccount,
    isCreateAccountLoading,
    isCreateLinkLoading,
    isDashboardLinkLoading,
    isUnlinkStripeLoading
  } = usePaymentAccount()

  const { balance, pendingBalance } = usePayoutBalance()
  const [isDeleting, setDeleting] = useState(false)

  const isActive = !!account.id
  const isCompleted = account.details_submitted

  const handleClick = () => {
    if (!isCompleted) {
      isActive ? onCreateLink() : onCreateAccount()
    } else {
      console.log('account connected')
    }
  }

  const handleUnlinkAccount = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (balance > 0 || pendingBalance > 0) {
      toast.show({
        type: 'error',
        msg: 'Available and Pending Balance should be 0 before unlinking Stripe account'
      })
      setDeleting(false)
      return
    }
    onUnlinkStripeAccount()
    setDeleting(false)
  }

  const dropMenu = (
    <DropdownMenu>
      <DropdownMenuItem disable={isDashboardLinkLoading}>
        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault()
            onCreateDashboardLink()
          }}
        >
          Go to Stripe Account
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem danger disable={isUnlinkStripeLoading}>
        <Link to="#" onClick={() => setDeleting(true)}>
          Unlink Stripe
        </Link>
      </DropdownMenuItem>
    </DropdownMenu>
  )

  const content =
    !isActive || !isCompleted ? (
      <Styles>
        <h3>Connect Stripe Account</h3>
        <p>
          In order to receive payments from your clients, you need to have a
          Stripe Account. For getting started and more info visit{' '}
          <a href="https://stripe.com/en-gb-us" className="link">
            Stripe
          </a>
        </p>
        <div className="divider"></div>
        <div className="stripe-not-connected">
          <img
            src={StripeImage}
            alt="stripe"
            className="stripe-not-connected__stripe-logo"
          />
          <p className="stripe-not-connected__connect_note">
            Click the &quot;<strong>Connect</strong>&quot; button below to link
            your <strong>Stripe Account</strong> with your{' '}
            <strong>CoachRight Account</strong>
          </p>
          {(isCreateLinkLoading || isCreateAccountLoading) && <Spin />}
          <button
            className="stripe-not-connected__connect_button"
            onClick={handleClick}
            disabled={isCreateAccountLoading || isCreateLinkLoading}
          >
            <img
              src={StripeSImage}
              alt="stripe"
              className="stripe-not-connected__connect_button__S"
            />
            <div className="vertical-divider"></div>
            <div className="stripe-not-connected__connect_button__note">
              Connect with Stripe
            </div>
          </button>
        </div>
      </Styles>
    ) : (
      <Styles>
        <h3>Connect Stripe Account</h3>
        <p>Your stripe account was connected successfully</p>
        <div className="divider"></div>
        <div className="stripe-connected">
          {(isDashboardLinkLoading || isUnlinkStripeLoading) && <Spin />}
          <img
            src={StripeImage}
            alt="stripe"
            className="stripe-connected__stripe-logo"
          />
          <p>Stripe Account - {account.business_profile?.name || ''}</p>
          <Dropdown overlay={dropMenu} placement="topLeft">
            <ThreeDotsIcon style={{ cursor: 'pointer' }} />
          </Dropdown>
        </div>
      </Styles>
    )

  return (
    <>
      {content}
      <Dialog
        title="Confirm Unlink Account?"
        open={isDeleting}
        onClose={() => setDeleting(false)}
      >
        <p>
          Are you sure you want to unlink Stripe account? Make sure your pending
          and available balances are zero before unlinking!
        </p>
        <br />
        <Button onClick={handleUnlinkAccount}>
          <DeleteOutlinedIcon /> Unlink
        </Button>
      </Dialog>
    </>
  )
}

export default StripeConnect
