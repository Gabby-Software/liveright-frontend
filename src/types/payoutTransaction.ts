export type PayoutTransaction = {
  amount: number
  type: string
  date: number
  currency: string
  invoiceId: number
  user: {
    firstName: string
    lastName: string
  }
}

export interface PayoutFilters {
  all?: number
  type?: string
}
