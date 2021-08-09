import React, {useState, useEffect} from 'react';
import Styles from './create-invoice-item.styles';
import {InvoiceFormType, InvoiceItemType} from "../../create-invoice.component";
import {ArrayHelpers, FormikProps} from "formik";
import FormRow from '../../../../components/forms/form-row/form-row.component';
import FormSelect from "../../../../components/forms/form-select/form-select.component";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {OptionType} from "../../../../types/option.type";
import FormCheckbox from "../../../../components/forms/form-checkbox/form-checkbox.component";
import FormInputLabeled, {FormInputLabeledUI} from "../../../../components/forms/form-input-labeled/form-input-labeled.component";
import formatter from "../../../../managers/formatter.manager";
import FormDatepicker from "../../../../components/forms/form-datepicker/form-datepicker.component";
import {asPrice} from "../../../../pipes/price.pipe";
import {asMoney} from "../../../../pipes/as-money.pipe";
import moment from "moment";

type Props = {
    form: FormikProps<InvoiceFormType>,
    helper: ArrayHelpers,
    item: InvoiceItemType
    i: number,
    credits:number;
};
const typeOptions: OptionType[] = [
    {label: 'PT session', value: 'PT session'},
    {label: 'Coaching session', value: 'Coaching session'},
    {label: 'Complimentary session', value: 'Complimentary session'},
];
const CreateInvoiceItem = ({form, helper, item, i, credits}: Props) => {
    const {t} = useTranslation();

    return (
        <Styles>
            <FormRow>
                <div className={'ci-item__left'}>
                    <FormRow>
                        <FormSelect name={`items.${i}.type`} label={t("invoices:create.type")}
                                    options={typeOptions}/>
                        <FormCheckbox name={`items.${i}.is_taxable`} label={"Is Taxed?"}/>
                    </FormRow>
                    <FormInputLabeled name={`items.${i}.name`}
                                      label={t('invoices:create.description')}/>
                    {
                        item.type === 'PT session'?(
                            <p className={'ci-item__credits'}>Total Sessions After Invoice: {credits}</p>
                        ):null
                    }
                </div>
                <div className={'ci-item__right'}>
                    <FormRow>
                        <FormInputLabeled format={formatter().number().min(1)}
                                          name={`items.${i}.quantity`}
                                          label={t("invoices:create.quantity")}/>
                        <FormInputLabeled format={formatter().number().min(0)}
                                          name={`items.${i}.unit_price`}
                                          label={t('invoices:create.price')}/>
                        <FormInputLabeled format={formatter().number().min(0).max(100)}
                                          name={`items.${i}.discount_percent`}
                                          label={t('invoices:create.discount')}/>
                        <FormInputLabeledUI name={`items.${i}.total`} label={'Total'} onUpdate={() =>{}}
                                            value={asMoney(asPrice((+item.unit_price)*item.quantity*(1-(item.discount_percent||0)/100)*(1+(item.is_taxable?(item.tax_rate||0):0)/100)))+' AED'}
                                            disabled/>
                    </FormRow>
                    <FormRow>
                        {
                            item.type === 'PT session'?(
                                <FormDatepicker label={'Session Expire on'}
                                                name={`items.${i}.extras.session_expires_on`}
                                                disabledDate={date => date.isBefore(moment().startOf("day"))}/>
                            ):null
                        }
                        {
                            item.is_taxable?(
                                <FormInputLabeled format={formatter().number().min(0).max(100)}
                                                  name={`items.${i}.tax_rate`}
                                                  label={t('invoices:create.tax')}/>
                            ):<div/>
                        }
                        {
                            item.type === 'PT session'?null:<div/>
                        }
                    </FormRow>
                </div>
            </FormRow>
            {
                form.values.items.length > 1 ? (
                    <div className={'ci-item__remove'} onClick={() => helper.remove(i)}>Remove</div>
                ):null
            }
        </Styles>
    )
};

export default CreateInvoiceItem;
