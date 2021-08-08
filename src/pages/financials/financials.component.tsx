import React, {useState, useEffect, lazy} from 'react';
import Styles from './financials.styles';
import {Skeleton, Tabs} from 'antd';
import {financialTabs} from "./financials.data";
import RoutedTabs from "../../components/routed-tabs/routed-tabs.component";
import {Route} from "react-router-dom";
import {Routes} from "../../enums/routes.enum";
import {onlyTrainer} from "../../guards/trainer.guard";

const FinancialsPayables = lazy(() => import("./tabs/financials-payables/financials-payables.component"));
const FinancialsOverview = lazy(() => import("./tabs/financials-overview/financials-overview.component"));
const FinancialsReceivables = lazy(() => import("./tabs/financials-receivables/financials-receivables.component"));
const FinancialsGoals = lazy(() => import("./tabs/financials-goals/financials-goals.component"));

type Props = {};
const Financials = ({}: Props) => {
    return (
        <Styles>
            <RoutedTabs tabs={financialTabs}/>
            <React.Suspense fallback={Skeleton}>
                <Route path={Routes.FINANCIALS_OVERVIEW} component={FinancialsOverview}/>
                <Route path={Routes.FINANCIALS_RECEIVABLES} component={FinancialsReceivables}/>
                <Route path={Routes.FINANCIALS_PAYABLES} component={FinancialsPayables}/>
                <Route path={Routes.FINANCIALS_GOALS} component={FinancialsGoals}/>
            </React.Suspense>
        </Styles>
    );
};

export default onlyTrainer(Financials);
