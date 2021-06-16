import {AccountDatabaseItemType} from "./account-database-item.type";

export type KpiType = {
    from: number;
    to: number;
    kpi: string;
    value: number;
}
export type KeyKpisType = AccountDatabaseItemType & {
    kpis: KpiType[];
}
