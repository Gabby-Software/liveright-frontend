import {statisticRange} from "../../../../enums/financials.enum";

export type TotalsType = {
    label:string,
    value: number,
    note?: string
}
export const receivablesTotals: {[key:string]: TotalsType[]} = {
    [statisticRange.MONTH]: [
        {
            label: 'Revenue',
            value: 300,
            note: '(30 Invoices)'
        },
        {
            label: 'Settled',
            value: 300,
            note: '(30 Invoices)'
        },
        {
            label: 'Overdue',
            value: 30,
            note: '(3 Invoices)'
        },
        {
            label: 'Left to Target',
            value: 100,
            note: 'of 1000'
        }
    ],
    [statisticRange.QUARTER]: [
        {
            label: 'Revenue',
            value: 900,
            note: '(90 Invoices)'
        },
        {
            label: 'Settled',
            value: 900,
            note: '(90 Invoices)'
        },
        {
            label: 'Overdue',
            value: 90,
            note: '(9 Invoices)'
        },
        {
            label: 'Left to Target',
            value: 300,
            note: 'of 3000'
        }
    ],
    [statisticRange.HALF_YEAR]: [
        {
            label: 'Revenue',
            value: 1800,
            note: '(180 Invoices)'
        },
        {
            label: 'Settled',
            value: 1800,
            note: '(180 Invoices)'
        },
        {
            label: 'Overdue',
            value: 180,
            note: '(18 Invoices)'
        },
        {
            label: 'Left to Target',
            value: 600,
            note: 'of 6000'
        }
    ],
    [statisticRange.YEAR]: [
        {
            label: 'Revenue',
            value: 3600,
            note: '(360 Invoices)'
        },
        {
            label: 'Settled',
            value: 3600,
            note: '(360 Invoices)'
        },
        {
            label: 'Overdue',
            value: 360,
            note: '(36 Invoices)'
        },
        {
            label: 'Left to Target',
            value: 1200,
            note: 'of 12000'
        }
    ]
}