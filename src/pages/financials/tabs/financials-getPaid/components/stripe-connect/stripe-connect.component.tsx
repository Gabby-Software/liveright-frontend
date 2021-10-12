import { Spin } from 'antd'
import React from 'react'

import { ThreeDotsIcon } from '../../../../../../assets/media/icons'
import StripeImage from '../../../../../../assets/media/Stripe.png'
import StripeSImage from '../../../../../../assets/media/Stripe-S.png'
import Styles from './stripe-connect.styles'

interface StripeConnectProps {
  account: any
  onCreateAccount: () => void
  onCreateLink: () => void
  isCreateAccountLoading: boolean
  isCreateLinkLoading: boolean
}

const StripeConnect = (props: StripeConnectProps) => {
  const {
    account,
    onCreateAccount,
    isCreateAccountLoading,
    isCreateLinkLoading,
    onCreateLink
  } = props
  const isActive = !!account.id
  const isCompleted = account.details_submitted

  const handleClick = () => {
    if (!isCompleted) {
      isActive ? onCreateLink() : onCreateAccount()
    } else {
      console.log('account connected')
    }
  }

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
          <img
            src={StripeImage}
            alt="stripe"
            className="stripe-connected__stripe-logo"
          />
          <p>Stripe Account - {account.business_profile?.name || ''}</p>
          <ThreeDotsIcon />
        </div>
      </Styles>
    )

  return content
}

export default StripeConnect