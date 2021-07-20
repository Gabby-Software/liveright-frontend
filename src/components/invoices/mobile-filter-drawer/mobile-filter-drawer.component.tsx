import React, {useState, useEffect} from 'react';
import Styles from './mobile-filter-drawer.styles';
import BottomDrawer from "../../bottom-drawer/bottom-drawer.component";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import {InvoiceFiltersType} from "../../../types/invoice-filters.type";
import {Form, Formik, FormikHelpers} from "formik";
import {clients, statuses} from "../../../pages/invoices/invoices.data";
import FormDrawerSelect from "../../forms/form-drawer-select/form-drawer-select.component";
import ButtonSubmit from "../../forms/button-submit/button-submit.component";

const initialValues: InvoiceFiltersType = {
    client_name: 'All',
    status: 'All'
};
const MobileFilterDrawer = () => {
    const {t} = useTranslation();
    const [isOpen, setOpen] = useState(false);
    const handleSubmit = (values: InvoiceFiltersType, helper: FormikHelpers<InvoiceFiltersType>) => {
        // todo: handle submit;
        helper.setSubmitting(false);
        setOpen(false);
    };
    const statusOptions = [
        {label: 'All', value: 'All'},
        ...statuses
    ];
    const clientOptions = [
        {label: 'All', value: 'All'},
        ...clients.map(({first_name, last_name}) => ({
            label: `${first_name} ${last_name}`,
            value: `${first_name} ${last_name}`
        }))
    ];
    return (
        <>
            <button style={{display: 'none'}} id={'filter-options'} onClick={() => setOpen(true)}/>
            <BottomDrawer title={t('invoices:filters')} isOpen={isOpen} onClose={() => setOpen(false)}>
                <Formik
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                >
                    <Form>
                        <Styles>
                            <FormDrawerSelect name={'status'} label={t('invoices:status')} options={statusOptions}/>
                            <FormDrawerSelect name={'client_name'} label={t('invoices:client-name')}
                                              options={clientOptions}/>
                            <ButtonSubmit>{t('submit')}</ButtonSubmit>
                        </Styles>
                    </Form>
                </Formik>
            </BottomDrawer>
        </>
    );
};

export default MobileFilterDrawer;
