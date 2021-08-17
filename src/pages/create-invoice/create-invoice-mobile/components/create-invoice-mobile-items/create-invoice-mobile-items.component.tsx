import React, {useState, useEffect} from 'react';
import Styles from './create-invoice-mobile-items.styles';
import {useInvoiceForm} from "../../../create-invoice.context";
import {createInvoiceSteps, defaultInvoiceItem, InvoiceFormType, InvoiceItemType} from "../../../create-invoice.data";
import {Formik, Form, FormikHelpers, FormikProps, FieldArray, ArrayHelpers} from "formik";
import * as Yup from "yup";
import CreateInvoiceSection from "../../../components/create-invoice-section/create-invoice-section.component";
import CreateInvoiceItem from "../../../components/create-invoice-item/create-invoice-item.component";
import FormButton from "../../../../../components/forms/form-button/form-button.component";
import CreateInvoiceMobileActions from "../create-invoice-mobile-actions/create-invoice-mobile-actions.component";
import CreateInvoiceMobileDetailsView
    from "../create-invoice-mobile-details-view/create-invoice-mobile-details-view.component";
import CreateInvoiceMobileClientView
    from "../create-invoice-mobile-client-view/create-invoice-mobile-client-view.component";
import CreateInvoiceMobileItemForm from "../create-invoice-mobile-item-form/create-invoice-mobile-item-form.component";
import CreateInvoiceMobileItem from "../create-invoice-mobile-item/create-invoice-mobile-item.component";
import Accordion from "../../../../../components/accordion/accordion.component";
import {toast} from "../../../../../components/toast/toast.component";

type Props = {};
const CreateInvoiceMobileItems = ({}: Props) => {
    const {values, setValues, setStep} = useInvoiceForm();
    const [items, setItems] = useState<InvoiceItemType[]>(values.items||[]);
    const [active, setActive] = useState(-1);
    const [open, setOpen] = useState(false);
    const handleFormSubmit = (formValues: InvoiceItemType, helper: FormikHelpers<InvoiceItemType>) => {
        if (active === -1) {
            setItems([...items, formValues]);
        } else {
            items[active] = formValues;
            setItems([...items]);
        }
        setActive(-1);
        setOpen(false);
        helper.setSubmitting(false);
        helper.resetForm();
    }
    const handleSubmit = (_: {}, helper: FormikHelpers<{}>) => {
        if(!items.length)
            return toast.show({type: 'error', msg: 'Add at least one item to invoice'});
        setValues({...values, items});
        setStep(createInvoiceSteps.NOTES);
        helper.setSubmitting(false);
    }
    return (
        <Styles>
            <CreateInvoiceMobileClientView/>
            <CreateInvoiceMobileDetailsView/>
            {
                items.map((item, idx) => (
                    <CreateInvoiceMobileItem item={item} active={idx === active}
                                             onClick={() => {setActive(idx);setOpen(true)}}/>
                ))
            }
            {
                open||!items.length?(
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={active === -1 ? defaultInvoiceItem : items[active]}
                        enableReinitialize
                        validationSchema={Yup.object({
                            quantity: Yup.number().required().min(1),
                            unit_price: Yup.number().required().min(1),
                            discount: Yup.number().min(0).max(100),
                            tax_rate: Yup.number().min(0).max(100)
                        })}
                    >
                        {
                            ({values}: FormikProps<InvoiceItemType>) => (
                                <Form>
                                    <CreateInvoiceMobileItemForm {...values}/>
                                    <FormButton htmlType={'submit'} type={'default'}>{active===-1?'Add to invoice':'Update item'}</FormButton>
                                </Form>
                            )
                        }
                    </Formik>
                ):(
                    <FormButton type={'default'}
                    onClick={() => setOpen(true)}>{'Add Another'}</FormButton>
                )
            }
            <Formik initialValues={{}} onSubmit={handleSubmit}>
                <Form>
                <CreateInvoiceMobileActions back={createInvoiceSteps.DETAILS}/>
                </Form>
            </Formik>
        </Styles>
    )
};

export default CreateInvoiceMobileItems;
