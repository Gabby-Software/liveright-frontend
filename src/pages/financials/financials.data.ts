import {Routes} from "../../enums/routes.enum";

export type TabType = {
    name: string;
    url: string;
}
export const financialTabs: TabType[] = [
    {name: 'Overview', url: Routes.FINANCIALS_OVERVIEW},
    {name: 'Receivables', url: Routes.FINANCIALS_RECEIVABLES},
    {name: 'Payables', url: Routes.FINANCIALS_PAYABLES},
    {name: 'Goals', url: Routes.FINANCIALS_GOALS},
];