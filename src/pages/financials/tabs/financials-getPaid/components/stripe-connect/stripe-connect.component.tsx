import React from 'react'

import StripeImage from '../../../../../../assets/media/Stripe.png'
import StripeSImage from '../../../../../../assets/media/Stripe-S.png'
import usePaymentAccount from '../../../../../../hooks/api/payments/usePaymentAccount'
import Styles from './stripe-connect.styles'

const StripeConnect = () => {
  const {
    account,
    onCreateAccount,
    isCreateAccountLoading,
    isCreateLinkLoading,
    onCreateLink
  } = usePaymentAccount()
  const isActive = !!account.id
  const isCompleted = account.details_submitted

  const handleClick = () => {
    if (!isCompleted) {
      isActive ? onCreateLink() : onCreateAccount()
    } else {
      console.log('account connected')
    }
  }

  console.log(account)

  const content = !isActive ? (
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
        <div className="stripe-not-connected__connect_button">
          <img
            src={StripeSImage}
            alt="stripe"
            className="stripe-not-connected__connect_button__S"
          />
          <div className="vertical-divider"></div>
          <div className="stripe-not-connected__connect_button__note">
            Connect with Stripe
          </div>
        </div>
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
        <p>Stripe Account - {account.business_profile.name}</p>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
            fill="#C2C2C2"
          />
          <path
            d="M9.79167 10.834C10.1368 10.834 10.4167 10.5542 10.4167 10.209C10.4167 9.86381 10.1368 9.58398 9.79167 9.58398C9.44649 9.58398 9.16667 9.86381 9.16667 10.209C9.16667 10.5542 9.44649 10.834 9.79167 10.834Z"
            fill="white"
            stroke="white"
          />
          <path
            d="M9.79167 5.41602C10.1368 5.41602 10.4167 5.13619 10.4167 4.79102C10.4167 4.44584 10.1368 4.16602 9.79167 4.16602C9.44649 4.16602 9.16667 4.44584 9.16667 4.79102C9.16667 5.13619 9.44649 5.41602 9.79167 5.41602Z"
            fill="white"
            stroke="white"
          />
          <path
            d="M9.79167 16.25C10.1368 16.25 10.4167 15.9702 10.4167 15.625C10.4167 15.2798 10.1368 15 9.79167 15C9.44649 15 9.16667 15.2798 9.16667 15.625C9.16667 15.9702 9.44649 16.25 9.79167 16.25Z"
            fill="white"
            stroke="white"
          />
        </svg>
      </div>
    </Styles>
  )

  return content
}

export default StripeConnect
