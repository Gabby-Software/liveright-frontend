import React, {useState, useEffect} from 'react';
import Styles from './financials-receivables.styles';
import Invoices from "../../../invoices/invoices.component";
import ReceivablesAttention from "./components/receivables-attention/receivables-attention.component";
import InvoicesAtention from "../../../invoices/components/invoices-atention/invoices-atention.component";
import {ACTION_GET_ATTENTION_INVOICES_REQUEST, ACTION_GET_INVOICES_REQUEST} from "../../../../store/action-types";
import userTypes from "../../../../enums/user-types.enum";
import {useAuth} from "../../../../hooks/auth.hook";
import {useDispatch, useSelector} from "react-redux";
import {statisticRange, statisticRangeOptions} from "../../../../enums/financials.enum";
import {FormSelectUI} from "../../../../components/forms/form-select/form-select.component";
import FinancialsReceivablesTotals
    from "./components/financials-receivables-totals/financials-receivables-totals.component";
import {receivablesTotals} from "./financials-receivables.data";
import PageSubtitle from "../../../../components/titles/page-subtitle.styles";
import InvoiceFilters from "../../../invoices/components/invoice-filters/invoice-filters.component";
import Hr from '../../../../components/hr/hr.styles';
import FinancialsReceivablesTable
    from "./components/financials-receivables-table/financials-receivables-table.component";
import FormButton from "../../../../components/forms/form-button/form-button.component";
import {Routes} from "../../../../enums/routes.enum";
import {Link} from 'react-router-dom';
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {RootState} from "../../../../store/reducers";
import FinanialsReceivablesFilters
    from "./components/finanials-receivables-filters/finanials-receivables-filters.component";
import {useIsMobile} from "../../../../hooks/is-mobile.hook";
import FinancialReceivablesList from "./components/financial-receivables-list/financial-receivables-list.component";
import {InvoicesProvider} from "../../../invoices/invoices.context";

type Props = {};
const FinancialsReceivables = ({}:Props) => {
    const {type, uuid} = useAuth();
    const isMobile = useIsMobile();
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [range, setRange] = useState(statisticRange.MONTH);
    return (
        <InvoicesProvider include={'invoiceTo'}>
        <Styles>
            <Link to={Routes.CREATE_INVOICE} className={'f-receivables__link'}><FormButton type={'primary'}>{t("invoices:add")}</FormButton></Link>
            <InvoicesAtention/>
            <div className={'f-receivables__range'}>
                <FormSelectUI name={'range'} label={'Totals for...'}
                              options={statisticRangeOptions} value={range} onUpdate={setRange}/>
            </div>
            <FinancialsReceivablesTotals data={receivablesTotals[range]}/>
            <PageSubtitle>All your Issued Invoices</PageSubtitle>
            <FinanialsReceivablesFilters/>
            {
                isMobile?(
                    <FinancialReceivablesList/>
                ):(
                    <FinancialsReceivablesTable/>
                )
            }
        </Styles>
        </InvoicesProvider>
    );
};

export default FinancialsReceivables;
