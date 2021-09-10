import Card from '../../../../../components/cards/card/card.component'
import { useInvoiceForm } from '../../../create-invoice.context'
import { createInvoiceSteps } from '../../../create-invoice.data'
import CreateInvoiceMobileItem from '../create-invoice-mobile-item/create-invoice-mobile-item.component'
import Styles from './create-invoice-mobile-items-view.styles'

const CreateInvoiceMobileItemsView = () => {
  const { values, setStep } = useInvoiceForm()
  return (
    <Styles onClick={() => setStep(createInvoiceSteps.ITEMS)}>
      <Card>
        {values.items.map((item, index) => (
          <CreateInvoiceMobileItem
            item={item}
            key={index}
            active={false}
            onClick={() => {}}
          />
        ))}
      </Card>
    </Styles>
  )
}

export default CreateInvoiceMobileItemsView
