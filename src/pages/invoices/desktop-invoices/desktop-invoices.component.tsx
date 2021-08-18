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
import {ReactComponent as DownloadIcon} from '../../../assets/media/icons/download.svg';
import FormRow from "../../../components/forms/form-row/form-row.component";
import {classes} from "../../../pipes/classes.pipe";
import DesktopAddInvocieTrigger
    from "../../../components/invoices/desktop-add-invocie-trigger/desktop-add-invocie-trigger.component";
import DesktopAddInvoiceTrigger
    from "../../../components/invoices/desktop-add-invoice-trigger/desktop-add-invoice-trigger.component";
import {useAuth} from "../../../hooks/auth.hook";
import userTypes from "../../../enums/user-types.enum";

const initialFilters: InvoiceFiltersType = {
    client_name: 'All',
    status: 'All'
};
const DesktopInvoices = () => {
    const [invoice, setInvoice] = useState<number | null>(null);
    const {type} = useAuth();
    const [pagMeta, setPagMeta] = useState<PaginationMetaType>({current_page: 1, per_page: 10, total: invoices.length});
    const {t} = useTranslation();
    const labels = [
        type === userTypes.TRAINER ? 'invoices:client-name' : 'invoices:trainer-name',
        'invoices:invoice-number',
        'invoices:price',
        'invoices:status'
    ];
    const keys = [
        'client_name',
        'id',
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
                                    ...statuses
                                ]}/>
                                {
                                    type === userTypes.TRAINER ? (
                                        <FormSelect name={'client_name'} label={t('invoices:client-name')} options={[
                                            {label: 'All', value: ''},
                                            ...clients.map(({first_name, last_name}) => ({
                                                label: `${first_name} ${last_name}`,
                                                value: `${first_name} ${last_name}`
                                            }))
                                        ]}/>
                                    ) : null
                                }
                                <ButtonSubmit className={'invoices__filter'}>{t('apply-filters')}</ButtonSubmit>
                                {
                                    type === userTypes.TRAINER ? <DesktopAddInvoiceTrigger/> : null
                                }
                            </FormRow>
                        </Form>
                    </Formik>
                </div>
                <DataTable
                    labels={labels}
                    data={invoices.slice((pagMeta.current_page - 1) * pagMeta.per_page, (pagMeta.current_page - 1) * pagMeta.per_page + pagMeta.per_page)}
                    keys={keys} onClick={({id}) => setInvoice(id)} active={invoice || undefined} render={{id: ({id}) => `#${id}`}}/>
                <DataPagination page={pagMeta.current_page} setPage={(page) => {
                    setPagMeta({...pagMeta, current_page: page})
                }} total={pagMeta.total}/>
            </div>
            <div className={classes('invoices__view', invoice && 'invoices__view__open')}>
                {
                    invoice ? (
                        <>
                            <div>
                                <BackIcon className={'invoices__close'} onClick={() => setInvoice(null)}/>
                                <a target={'_blank'} href={'http://www.africau.edu/images/default/sample.pdf'}
                                   download={'invoice.pdf'}><DownloadIcon className={'invoices__download'}/></a>
                            </div>
                            <Card className={'invoices__view__card'}>
                                <InvoiceView id={invoice}/>
                            </Card>
                        </>
                    ) : null
                }
            </div>
        </Styles>
    )
};

export default DesktopInvoices;
