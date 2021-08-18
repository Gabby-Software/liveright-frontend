import React, {useState, useEffect, FC} from 'react';
import Styles from './create-invoice-mobile-item.styles';
import {InvoiceItemType} from "../../../create-invoice.data";
import {ReactComponent as EditIcon} from "../../../../../assets/media/icons/edit.svg";
import CreateInvoiceMobileItemForm from "../create-invoice-mobile-item-form/create-invoice-mobile-item-form.component";
import {asMoney} from "../../../../../pipes/as-money.pipe";
import {asPrice} from "../../../../../pipes/price.pipe";
import {classes} from "../../../../../pipes/classes.pipe";

type Props = {
    item: InvoiceItemType;
    active: boolean;
    onClick: () => void;
};
const CreateInvoiceMobileItem: FC<Props> = ({item, active, onClick}) => {
    return (
        <Styles onClick={onClick} className={classes(active && 'ci-item__active')}>
            <div className={'ci-item'}>
                <div className={'ci-item__type'}>{item.type}</div>
                <EditIcon className={'ci-item__icon'}/>
                <div className={'ci-item__total'}>{asMoney(asPrice((+item.unit_price)*item.quantity*(1-(item.discount_percent||0)/100)*(1+(item.is_taxable?(item.tax_rate||0):0)/100)))+' AED'}</div>
            </div>
        </Styles>
    )
};

export default CreateInvoiceMobileItem;