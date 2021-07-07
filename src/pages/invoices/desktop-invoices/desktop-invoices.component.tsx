import React, {useState, useEffect} from 'react';
import Styles from './desktop-invoices.styles';
import {PaginationMetaType} from "../../../types/pagination-meta.type";
import {clients, invoices, statuses} from "../invoices.data";
import logger from "../../../managers/logger.manager";
import DataTable from "../../../components/data-table/data-table.component";
import DataPagination from "../../../components/data-pagination/data-pagination.component";
import Card from "../../../components/card/card.style";
import InvoiceView from "../../invoice/invoice-view/invoice-view.component";
import {Form, Formik, FormikHelpers, FormikProps} from "formik";
import {InvoiceFiltersType} from "../../../types/invoice-filters.type";
import FormSelect from "../../../components/forms/form-select/form-select.component";
import ButtonSubmit from "../../../components/forms/button-submit/button-submit.component";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import {ReactComponent as BackIcon} from '../../../assets/media/icons/times.svg';
import FormRow from "../../../components/forms/form-row/form-row.component";
import {classes} from "../../../pipes/classes.pipe";

const initialFilters: InvoiceFiltersType = {
    client_name: 'All',
    status: 'All'
};
const DesktopInvoices = () => {
    const [invoice, setInvoice] = useState<number | null>(null);
    const [pagMeta, setPagMeta] = useState<PaginationMetaType>({current_page: 1, per_page: 10, total: invoices.length});
    const {t} = useTranslation();
    const labels = [
        'invoices:client-name',
        'invoices:invoice-number',
        'invoices:price',
        'invoices:status'
    ];
    const keys = [
        'client_name',
        'invoice_number',
        'price',
        'status'
    ];
    const handleSubmit = (values: InvoiceFiltersType, helper: FormikHelpers<InvoiceFiltersType>) => {
        alert('filtering..');
        helper.setSubmitting(false);
    };
    return (
        <Styles>
            <div className={'invoices__data'}>
                <div className={'invoice__filters'}>
                    <Formik
                        initialValues={initialFilters}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <FormRow className={'invoices__filters'}>
                                <FormSelect name={'status'} label={t('invoices:status')} options={[
                                    {label: 'All', value: ''},
                                    ...statuses.map(({name}) => ({label: name, value: name}))
                                ]}/>
                                <FormSelect name={'client_name'} label={t('invoices:client-name')} options={[
                                    {label: 'All', value: ''},
                                    ...clients.map(({first_name, last_name}) => ({
                                        label: `${first_name} ${last_name}`,
                                        value: `${first_name} ${last_name}`
                                    }))
                                ]}/>
                                <ButtonSubmit className={'invoices__filter'}>{t('apply-filters')}</ButtonSubmit>
                            </FormRow>
                        </Form>
                    </Formik>
                </div>
                <DataTable labels={labels}
                           data={invoices.slice((pagMeta.current_page - 1) * pagMeta.per_page, (pagMeta.current_page - 1) * pagMeta.per_page + pagMeta.per_page)}
                           keys={keys} onClick={({id}) => setInvoice(id)} active={invoice || undefined}/>
                <DataPagination page={pagMeta.current_page} setPage={(page) => {
                    setPagMeta({...pagMeta, current_page: page})
                }} total={pagMeta.total}/>
            </div>
            <div className={classes('invoices__view', invoice && 'invoices__view__open')}>
            {
                invoice ? (
                    <>
                    <Card className={'invoices__view__card'}>
                        <InvoiceView id={invoice}/>
                    </Card>
                        <BackIcon className={'invoices__close'} onClick={() => setInvoice(null)}/>
                    </>
                ) : null
            }
            </div>
        </Styles>
    )
};

export default DesktopInvoices;
