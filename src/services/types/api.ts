export interface InvoiceIssuer {
  id: number
  user: {
    first_name: string
    last_name: string
    avatar?: {
      url: string
    }
  }
}
