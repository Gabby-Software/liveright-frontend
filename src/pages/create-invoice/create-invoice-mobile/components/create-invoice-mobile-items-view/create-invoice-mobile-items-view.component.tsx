import React, {useState, useEffect} from 'react';
import Styles from './create-invoice-mobile-items-view.styles';
import {useInvoiceForm} from "../../../create-invoice.context";
import {createInvoiceSteps} from "../../../create-invoice.data";
import {asMoney} from "../../../../../pipes/as-money.pipe";
import {asPrice} from "../../../../../pipes/price.pipe";
import Card from "../../../../../components/card/card.style";

const CreateInvoiceMobileItemsView = () => {
    const {values, setStep} = useInvoiceForm();
    return (
        <Styles onClick={() => setStep(createInvoiceSteps.ITEMS)}>
            {
                values.items.map((item, i) => (
                    <Card className={'ci-view__item'}>
                        <div className={'ci-view__item__type'}>{item.type}</div>
                        <div className={'ci-view__item__total'}>{asMoney(asPrice((+item.unit_price)*item.quantity*(1-(item.discount_percent||0)/100)*(1+(item.is_taxable?(item.tax_rate||0):0)/100)))+' AED'}</div>
                    </Card>
                ))
            }
        </Styles>
    );
};

export default CreateInvoiceMobileItemsView;
