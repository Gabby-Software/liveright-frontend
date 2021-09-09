import { useIsMobile } from '../../hooks/is-mobile.hook'
import InvoiceDesktop from './invoice-desktop/invoice-desktop.component'
import InvoiceMobile from './invoice-mobile/invoice-mobile.component'

export default function Invoice() {
  const isMobile = useIsMobile()
  return isMobile ? <InvoiceMobile /> : <InvoiceDesktop />
}
