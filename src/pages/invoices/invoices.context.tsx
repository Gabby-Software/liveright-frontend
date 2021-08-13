import React, {useState, useEffect, useContext, createContext, useRef} from 'react';
import {InvoiceAttendeeType, InvoiceType} from "../../types/invoice.type";
import {PaginatedDataType} from "../../types/paginated-data.type";
import {InvoicesFilters, InvoicesReducerType} from "../../store/reducers/invoices.reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers";
import {ACTION_GET_INVOICES_REQUEST} from "../../store/action-types";
import {CurrencyType} from "../../types/currency.type";
import {FileType} from "../../types/file.type";
import {AddressType} from "../../types/address.type";

export type InvoicesContextType = InvoicesReducerType & {
    update: (page: number, filters: InvoicesFilters) => Promise<void>,
};

const InvoicesContext = createContext<InvoicesContextType>({
    current: {
        data: [],
        meta: {
            current_page: 1,
            total: 0,
            per_page: 10
        }
    },
    needAttention: {
        data: [],
        meta: {
            current_page: 1,
            total: 0,
            per_page: 10
        }
    },
    filters: {
        search: '',
        status: '',
        invoice_from: '',
    },
    error: '',
    loading: true,
    update: () => Promise.resolve(),
});
export const useInvoices = () => useContext(InvoicesContext);
export const InvoicesProvider = ({children}: { children: React.ReactNode }) => {
    const invoiceData = useSelector((state: RootState) => state.invoices);
    const dispatch = useDispatch();
    const timer = useRef(0);
    const update = (page: number, filters: InvoicesFilters) => {
        return new Promise((res) => {
            clearTimeout(timer.current);
            timer.current = setTimeout(() => {
                dispatch({
                    type: ACTION_GET_INVOICES_REQUEST,
                    payload: {
                        include: 'invoiceFrom',
                        page, filters,
                        onSuccess: res
                    }
                })
            }, 400) as unknown as number;
        });
    }
    useEffect(() => {
        update(invoiceData.page, invoiceData.filters)
    }, []);
    return (
        <InvoicesContext.Provider value={{...invoiceData, update}}>
            {children}
        </InvoicesContext.Provider>
    );
};
export const PayablesProvider = ({children}:{children: React.ReactNode}) => {
    let id = 1;
    const demoInvoice: InvoiceType = {
        id: 100000,
        created_at: '2021-01-01',
        payment_method: 'cash',
        currency: {
            id: 1,
            name: 'Derham',
            code: 'UED',
            symbol: 'UED'
        },
        discount_amount: 50,
        discount_percent: 50,
        due_on: '2021-07-07',
        invoice_number: '#ee-popot-ioio',
        is_taxable: true,
        status: 'overdue',
        subtotal: 100,
        tax_rate: 20,
        tax_value: 40,
        total: 1000,
        type: 'PT Session',
        pdf: null,
        invoice_from: {
            id: 2,
            type: 'PT session',
            uuid: '',
            user: {
                id: 1,
                email: 'email@email.com',
                first_name: 'Liveright',
                last_name: 'Liveright'
            },
        },
        invoice_to: {
            id: 2,
            type: 'PT session',
            uuid: '',
            user: {
                id: 1,
                email: 'email@email.com',
                first_name: 'Liveright',
                last_name: 'Liveright'
            },
        }
    }
    const demoData: InvoicesContextType = {
        loading: false,
        error: '',
        current: {
            data: [
                demoInvoice, demoInvoice, demoInvoice
            ],
            meta: {
                current_page: 1,
                total: 3,
                per_page: 10,
            }
        },
        needAttention: {
            data: [
                demoInvoice, demoInvoice, demoInvoice
            ],
            meta: {
                current_page: 1,
                total: 3,
                per_page: 10,
            }
        },
        filters: {
            search: '',
            status: '',
            invoice_from: ''
        },
        update: () => Promise.resolve()
    }
    return (
        <InvoicesContext.Provider value={demoData}>
            {children}
        </InvoicesContext.Provider>
    );
}