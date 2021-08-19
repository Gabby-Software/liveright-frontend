import { OptionType } from '../types/option.type'

export const paymentMethods = {
  CREDIT_CARD: 'credit_card',
  CASH: 'cash'
}
export const paymentMethodsOptions: OptionType[] = [
  { label: 'Credit Card', value: paymentMethods.CREDIT_CARD },
  { label: 'Cash', value: paymentMethods.CASH }
]
