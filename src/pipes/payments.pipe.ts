function getBase(base: string) {
  return document.location.host.startsWith('localhost')
    ? 'http://localhost:5111'
    : `${document.location.protocol}//${base}.${document.location.host}`
}

export function payments(id: number | string) {
  return `${getBase('payments')}/invoices/${id}/pay`
}

export function invoices(id: number | string) {
  return `${getBase('invoices')}/invoices/${id}`
}

export const formatCreditCard = (no: string) => {
  let formatedNo = no.replace(/.(?=.{4})/g, '*')
  formatedNo = formatedNo.replace(/^(.{3})(.{4})(.{5})(.*)$/, '$1 $2 $3 $4')
  return formatedNo
}
