export type PayoutTransaction = {
  amount: number
  type: string
  date: number
  currency: string
}

export interface PayoutFilters {
  type?: string
}
