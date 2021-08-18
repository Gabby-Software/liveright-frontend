import React, {useState, useEffect, FC} from 'react';
import Styles from './create-invoice-mobile-item-form.styles';
import {OptionType} from "../../../../../types/option.type";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import FormSelect from "../../../../../components/forms/form-select/form-select.component";
import FormCheckbox from "../../../../../components/forms/form-checkbox/form-checkbox.component";
import FormInputLabeled from "../../../../../components/forms/form-input-labeled/form-input-labeled.component";
import formatter from "../../../../../managers/formatter.manager";
import {asMoney} from "../../../../../pipes/as-money.pipe";
import {asPrice} from "../../../../../pipes/price.pipe";
import FormDatepicker from "../../../../../components/forms/form-datepicker/form-datepicker.component";
import moment from "moment";
import {InvoiceItemType} from "../../../create-invoice.data";
const typeOptions: OptionType[] = [
    {label: 'PT session', value: 'PT session'},
    {label: 'Coaching session', value: 'Coaching session'},
];
const CreateInvoiceMobileItemForm: FC<InvoiceItemType> = ({
    type, quantity, unit_price, is_taxable, tax_rate, discount_percent
                                                          }) => {
    const {t} = useTranslation();
    return (
            <Styles>
                <FormSelect name={`type`} label={t("invoices:create.type")}
                            options={typeOptions}/>
                <FormInputLabeled name={`name`} label={t('invoices:create.description')}/>
                <div className={'ci-item__row'}>
                    <FormInputLabeled format={formatter().number().min(0)}
                                      name={`unit_price`}
                                      label={t('invoices:create.price')}/>
                    <FormCheckbox name={`is_taxable`} label={"Is Taxed?"}/>
                </div>
                <div className={'ci-item__row'}>
                    <FormInputLabeled format={formatter().number().min(1)}
                                      name={`quantity`}
                                      label={t("invoices:create.quantity")}/>

                    <FormInputLabeled format={formatter().number().min(0).max(100)}
                                      name={`discount_percent`}
                                      label={t('invoices:create.discount')}/>
                </div>
                <div className={'ci-item__row'}>
                    {
                        type === 'PT session'?(
                            <FormDatepicker label={'Session Expire on'}
                                            name={`extras.session_expires_on`}
                                            disabledDate={date => date.isBefore(moment().startOf("day"))}/>
                        ):null
                    }
                    {
                        is_taxable?(
                            <FormInputLabeled format={formatter().number().min(0).max(100)}
                                              name={`tax_rate`}
                                              label={t('invoices:create.tax')}/>
                        ):<div/>
                    }
                    {
                        type === 'PT session'?null:<div/>
                    }
                </div>
                <div className={'ci-item__total'}>
                    <span>{t('invoices:subtotal')}</span>
                    <span className={'ci-item__total__value'}>{
                        asMoney(asPrice((+unit_price)*quantity*(1-(discount_percent||0)/100)*(1+(is_taxable?(tax_rate||0):0)/100)))+' AED'
                    }</span>
                </div>
            </Styles>
    );
};

export default CreateInvoiceMobileItemForm;
